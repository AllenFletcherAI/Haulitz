// functions/api/ping.js
// Cloudflare Pages Function: Live Roundtrip Latency to AWS Frankfurt (eu-central-1)

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
      region: 'AWS Europe Central 1 (Frankfurt)',
      latency_ms: elapsed,
      server_time: data.rows?.[0]?.server_time || new Date().toISOString(),
      engine: 'PostgreSQL 18.6 (Neon Serverless)'
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
