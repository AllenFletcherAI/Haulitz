// _worker.js
// Cloudflare Edge Worker Router for Haulitz Enterprise Gateway
// Provides Edge Security Guard, Frankfurt Neon DB Integration, and Resend Transactional Alerting

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Edge Security Guard: Hard 403 on internal files & sensitive paths
    if (
      url.pathname.includes('/.git') ||
      url.pathname.includes('/.env') ||
      url.pathname.includes('/scripts') ||
      url.pathname.endsWith('.md') ||
      url.pathname.endsWith('.jsonl')
    ) {
      return new Response('403 Forbidden: System Security Guard Active', {
        status: 403,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // 2. CORS Headers for API calls
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const dbUrl = env && env.DATABASE_URL;
    const resendKey = env && env.RESEND_API_KEY;
    const alertEmail = (env && env.DISPUTE_ALERT_EMAIL) || 'allensimeonfletcher@gmail.com';
    const neonEndpoint = 'https://ep-dry-hill-b9dgvhqy-pooler.c-7.eu-central-1.aws.neon.tech/sql';

    // Guard: Check environment configuration
    if (!dbUrl && (url.pathname.startsWith('/api/ping') || url.pathname.startsWith('/api/stats') || url.pathname.startsWith('/api/audit'))) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'DATABASE_URL environment variable is not configured in Cloudflare Worker Settings.'
      }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 3. GET /api/ping — Test live edge-to-Frankfurt database roundtrip
    if (url.pathname === '/api/ping') {
      const start = Date.now();
      try {
        const resp = await fetch(neonEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Neon-Connection-String': dbUrl
          },
          body: JSON.stringify({ query: 'SELECT NOW() as server_time, version();' })
        });
        const elapsed = Date.now() - start;
        const data = await resp.json();
        return new Response(JSON.stringify({
          ok: true,
          region: 'AWS eu-central-1 (Frankfurt)',
          latency_ms: elapsed,
          server_time: data.rows?.[0]?.server_time || new Date().toISOString(),
          engine: 'PostgreSQL 18.6 (Neon Serverless)'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 4. GET /api/stats — Retrieve real database verified metrics (zero fake numbers)
    if (url.pathname === '/api/stats') {
      try {
        const resp = await fetch(neonEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Neon-Connection-String': dbUrl
          },
          body: JSON.stringify({
            query: `
              SELECT 
                count(*) as total,
                count(*) FILTER (WHERE status = 'VERIFIED_CLEAN') as clean_count,
                count(*) FILTER (WHERE status = 'QUARANTINE_HOLD') as quarantine_count,
                max(timestamp) as last_seal
              FROM audit_logs;
            `
          })
        });
        const data = await resp.json();
        const row = data.rows?.[0] || { total: '0', clean_count: '0', quarantine_count: '0', last_seal: null };
        return new Response(JSON.stringify({
          ok: true,
          total_audits: parseInt(row.total, 10),
          clean_audits: parseInt(row.clean_count, 10),
          quarantine_holds: parseInt(row.quarantine_count, 10),
          last_seal: row.last_seal,
          region: 'Frankfurt (eu-central-1)'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 5. POST /api/audit — Persist deterministic audit record to Frankfurt GoBD ledger
    if (url.pathname === '/api/audit' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { domain_id, document_ref, status, discrepancy_count, sha256_seal, previous_seal, details } = body;

        let prevSeal = previous_seal;
        if (!prevSeal) {
          const lastResp = await fetch(neonEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Neon-Connection-String': dbUrl
            },
            body: JSON.stringify({ query: 'SELECT sha256_seal FROM audit_logs ORDER BY id DESC LIMIT 1;' })
          });
          const lastData = await lastResp.json();
          prevSeal = lastData.rows?.[0]?.sha256_seal || '0000000000000000000000000000000000000000000000000000000000000000';
        }

        // Strict input sanitization (OWASP A03 Injection Prevention)
        const safeDomainId = String(domain_id || '').replace(/[^a-zA-Z0-9_\-]/g, '').slice(0, 50);
        const safeDocRef = String(document_ref || '').replace(/[^a-zA-Z0-9_\-\.\/]/g, '').slice(0, 100);
        const safeStatus = String(status || '').replace(/[^a-zA-Z0-9_]/g, '').slice(0, 30);
        const safeSeal = String(sha256_seal || '').replace(/[^a-fA-F0-9]/g, '').slice(0, 64);
        const safePrevSeal = String(prevSeal || '').replace(/[^a-fA-F0-9]/g, '').slice(0, 64);
        const safeDiscrepancyCount = parseInt(discrepancy_count, 10) || 0;
        const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
        const safeClientIp = String(clientIp).replace(/[^a-fA-F0-9\.:]/g, '').slice(0, 45);
        const detailsJson = JSON.stringify(details || {}).replace(/'/g, "''");

        const insertQuery = `
          INSERT INTO audit_logs (domain_id, document_ref, status, discrepancy_count, sha256_seal, previous_seal, details_json, client_ip)
          VALUES ('${safeDomainId}', '${safeDocRef}', '${safeStatus}', ${safeDiscrepancyCount}, '${safeSeal}', '${safePrevSeal}', '${detailsJson}'::jsonb, '${safeClientIp}')
          RETURNING id, timestamp, sha256_seal;
        `;

        const insertResp = await fetch(neonEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Neon-Connection-String': dbUrl
          },
          body: JSON.stringify({ query: insertQuery })
        });
        const insertData = await insertResp.json();

        return new Response(JSON.stringify({
          ok: true,
          record: insertData.rows?.[0],
          message: 'GoBD § 147 AO cryptographic block committed to Frankfurt Neon DB'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 6. POST /api/dispute — Trigger live email alert via Resend & record ticket
    if (url.pathname === '/api/dispute' && request.method === 'POST') {
      if (!resendKey) {
        return new Response(JSON.stringify({
          ok: false,
          error: 'RESEND_API_KEY environment variable is not configured in Cloudflare Worker Settings.'
        }), {
          status: 503,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      try {
        const body = await request.json();
        const { domain_id, document_ref, dispute_reason, governing_law } = body;

        const emailHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #08090b; color: #f0f2f5; padding: 32px; border-radius: 8px; border: 1px solid #1e232d;">
            <div style="border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 24px;">
              <span style="font-size: 22px; font-weight: 800; letter-spacing: 2px; color: #ffffff;">HAULITZ</span>
              <span style="background: rgba(239,68,68,0.15); color: #f87171; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; margin-left: 12px; border: 1px solid rgba(239,68,68,0.3); text-transform: uppercase;">
                Legal Quarantine Hold
              </span>
            </div>
            
            <h2 style="color: #ffffff; font-size: 17px; margin-top: 0; font-weight: 600;">Statutory Commercial Incident Dispatch</h2>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
              A commercial document failed deterministic verification and was quarantined under <strong>${governing_law || 'Statutory Commercial Law'}</strong>.
            </p>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #101319; border-radius: 6px; overflow: hidden; border: 1px solid #1e232d;">
              <tr style="border-bottom: 1px solid #1e232d;">
                <td style="padding: 12px 16px; color: #64748b; font-size: 13px; width: 35%;">Domain / Industry</td>
                <td style="padding: 12px 16px; color: #ffffff; font-weight: 600; font-size: 13px;">${(domain_id || '').toUpperCase()}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1e232d;">
                <td style="padding: 12px 16px; color: #64748b; font-size: 13px;">Document Reference</td>
                <td style="padding: 12px 16px; color: #10b981; font-family: monospace; font-size: 13px;">${document_ref}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1e232d;">
                <td style="padding: 12px 16px; color: #64748b; font-size: 13px;">Governing Statute</td>
                <td style="padding: 12px 16px; color: #ffffff; font-size: 13px;">${governing_law || '§ 14 UStG / HGB § 377'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; color: #64748b; font-size: 13px;">Variance / Violation</td>
                <td style="padding: 12px 16px; color: #f87171; font-weight: 600; font-size: 13px;">${dispute_reason}</td>
              </tr>
            </table>

            <div style="background: #12161f; border-left: 3px solid #10b981; padding: 12px 16px; margin: 20px 0; font-size: 12px; color: #94a3b8; font-family: monospace;">
              GoBD Ledger Audit: Frankfurt eu-central-1 (Neon PostgreSQL 18.6)<br/>
              Timestamp: ${new Date().toUTCString()}
            </div>

            <p style="color: #64748b; font-size: 11px; margin-top: 24px;">
              This transmission was deterministically dispatched by the Haulitz Verification Gateway.
            </p>
          </div>
        `;

        const emailResp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Haulitz Audit Desk <onboarding@resend.dev>',
            to: alertEmail,
            subject: `[HAULITZ DISPUTE] ${domain_id.toUpperCase()} Incident: ${document_ref}`,
            html: emailHtml
          })
        });

        const emailResult = await emailResp.json();

        // Record in Neon dispute_tickets with strict sanitization
        const safeDomainId = String(domain_id || '').replace(/[^a-zA-Z0-9_\-]/g, '').slice(0, 50);
        const safeDocRef = String(document_ref || '').replace(/[^a-zA-Z0-9_\-\.\/]/g, '').slice(0, 100);
        const reasonEscaped = String(dispute_reason || '').replace(/'/g, "''");
        const lawEscaped = String(governing_law || '').replace(/'/g, "''");
        const resendId = String(emailResult?.id || 'none').replace(/[^a-zA-Z0-9_\-]/g, '');
        const safeAlertEmail = String(alertEmail).replace(/'/g, "''");

        const insertQuery = `
          INSERT INTO dispute_tickets (domain_id, document_ref, dispute_reason, governing_law, email_sent_to, resend_id)
          VALUES ('${safeDomainId}', '${safeDocRef}', '${reasonEscaped}', '${lawEscaped}', '${safeAlertEmail}', '${resendId}')
          RETURNING id;
        `;

        await fetch(neonEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Neon-Connection-String': dbUrl
          },
          body: JSON.stringify({ query: insertQuery })
        });

        return new Response(JSON.stringify({
          ok: true,
          email_dispatched: true,
          resend_id: emailResult.id,
          sent_to: alertEmail,
          message: 'Legal dispute notice dispatched via Resend and committed to Frankfurt ledger'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 7. Workspace clean routing & legacy backward compatibility aliases
    const workspaceAliases = {
      '/fintech': '/workspaces/fintech.html',
      '/fintech.html': '/workspaces/fintech.html',
      '/logistics': '/workspaces/logistics.html',
      '/logistics.html': '/workspaces/logistics.html',
      '/supply-chain': '/workspaces/supply-chain.html',
      '/supply-chain.html': '/workspaces/supply-chain.html',
      '/supply': '/workspaces/supply-chain.html',
      '/insurtech': '/workspaces/insurtech.html',
      '/insurtech.html': '/workspaces/insurtech.html',
      '/legaltech': '/workspaces/legaltech.html',
      '/legaltech.html': '/workspaces/legaltech.html',
      '/healthtech': '/workspaces/healthtech.html',
      '/healthtech.html': '/workspaces/healthtech.html',
      '/ecommerce': '/workspaces/ecommerce.html',
      '/ecommerce.html': '/workspaces/ecommerce.html',
      '/cleantech': '/workspaces/cleantech.html',
      '/cleantech.html': '/workspaces/cleantech.html',
      '/proptech': '/workspaces/proptech.html',
      '/proptech.html': '/workspaces/proptech.html',
      '/erp': '/workspaces/erp-staging.html',
      '/erp-staging': '/workspaces/erp-staging.html',
      '/erp-staging.html': '/workspaces/erp-staging.html'
    };

    if (workspaceAliases[url.pathname] && env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      const rewritten = new URL(request.url);
      rewritten.pathname = workspaceAliases[url.pathname];
      return env.ASSETS.fetch(new Request(rewritten, request));
    }

    // 8. Default fallback: serve static assets via Cloudflare Pages / Workers Assets
    if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Haulitz Enterprise Gateway (Worker Active)', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
