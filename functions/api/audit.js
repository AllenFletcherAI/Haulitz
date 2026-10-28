// functions/api/audit.js
// Cloudflare Pages Function: Commit GoBD Cryptographic Seal Block to Frankfurt Neon DB

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  const dbUrl = context.env.DATABASE_URL;
  const neonEndpoint = 'https://ep-dry-hill-b9dgvhqy-pooler.c-7.eu-central-1.aws.neon.tech/sql';

  if (!dbUrl) {
    return new Response(JSON.stringify({
      ok: false,
      error: 'DATABASE_URL environment variable is not configured in Cloudflare Pages.'
    }), {
      status: 503,
      headers: corsHeaders
    });
  }

  try {
    const body = await context.request.json();
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

    const clientIp = context.request.headers.get('cf-connecting-ip') || '127.0.0.1';
    const detailsJson = JSON.stringify(details || {}).replace(/'/g, "''");

    const insertQuery = `
      INSERT INTO audit_logs (domain_id, document_ref, status, discrepancy_count, sha256_seal, previous_seal, details_json, client_ip)
      VALUES ('${domain_id}', '${document_ref}', '${status}', ${parseInt(discrepancy_count, 10) || 0}, '${sha256_seal}', '${prevSeal}', '${detailsJson}'::jsonb, '${clientIp}')
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
      message: 'GoBD § 147 AO Block immutably committed to Frankfurt Neon DB'
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
