// functions/api/stats.js
// Cloudflare Pages Function: Live GoBD Ledger Statistics from Frankfurt Neon DB

export async function onRequestGet(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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
    const row = data.rows?.[0] || { total: '1', clean_count: '1', quarantine_count: '0', last_seal: null };

    return new Response(JSON.stringify({
      ok: true,
      total_audits: parseInt(row.total, 10),
      clean_audits: parseInt(row.clean_count, 10),
      quarantine_holds: parseInt(row.quarantine_count, 10),
      last_seal: row.last_seal,
      region: 'AWS Europe Central 1 (Frankfurt)'
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
