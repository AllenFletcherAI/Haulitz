// functions/api/dispute.js
// Cloudflare Pages Function: Dispatch Statutory Dispute via Resend & Log Ticket

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  const dbUrl = context.env.DATABASE_URL;
  const resendKey = context.env.RESEND_API_KEY;
  const alertEmail = context.env.DISPUTE_ALERT_EMAIL || 'allensimeonfletcher@gmail.com';
  const neonEndpoint = 'https://ep-dry-hill-b9dgvhqy-pooler.c-7.eu-central-1.aws.neon.tech/sql';

  if (!resendKey || !dbUrl) {
    return new Response(JSON.stringify({
      ok: false,
      error: 'Environment bindings DATABASE_URL and RESEND_API_KEY must be configured in Cloudflare Pages Settings.'
    }), {
      status: 503,
      headers: corsHeaders
    });
  }

  try {
    const body = await context.request.json();
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

    // Record in Neon dispute_tickets
    const reasonEscaped = dispute_reason.replace(/'/g, "''");
    const lawEscaped = (governing_law || '').replace(/'/g, "''");
    const resendId = emailResult.id || 'none';

    const insertQuery = `
      INSERT INTO dispute_tickets (domain_id, document_ref, dispute_reason, governing_law, email_sent_to, resend_id)
      VALUES ('${domain_id}', '${document_ref}', '${reasonEscaped}', '${lawEscaped}', '${alertEmail}', '${resendId}')
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
    }), { headers: corsHeaders });

  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
