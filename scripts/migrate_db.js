// scripts/migrate_db.js
// Provisions PostgreSQL tables in Frankfurt (AWS eu-central-1) for GoBD Audit Trail

const conn = process.env.DATABASE_URL;
if (!conn) {
  console.error('ERROR: DATABASE_URL environment variable is required.');
  process.exit(1);
}

async function migrate() {
  const endpoint = 'https://ep-dry-hill-b9dgvhqy-pooler.c-7.eu-central-1.aws.neon.tech/sql';
  
  const sqlStatements = [
    `CREATE TABLE IF NOT EXISTS audit_logs (
      id SERIAL PRIMARY KEY,
      timestamp TIMESTAMPTZ DEFAULT NOW(),
      domain_id VARCHAR(50) NOT NULL,
      document_ref VARCHAR(100) NOT NULL,
      status VARCHAR(30) NOT NULL,
      discrepancy_count INT DEFAULT 0,
      sha256_seal VARCHAR(64) NOT NULL,
      previous_seal VARCHAR(64),
      details_json JSONB,
      client_ip VARCHAR(45)
    );`,
    `CREATE TABLE IF NOT EXISTS dispute_tickets (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      domain_id VARCHAR(50) NOT NULL,
      document_ref VARCHAR(100) NOT NULL,
      dispute_reason TEXT NOT NULL,
      governing_law VARCHAR(100),
      email_sent_to VARCHAR(150),
      resend_id VARCHAR(100),
      status VARCHAR(30) DEFAULT 'DISPATCHED'
    );`,
    `CREATE INDEX IF NOT EXISTS idx_audit_domain ON audit_logs(domain_id);`,
    `CREATE INDEX IF NOT EXISTS idx_audit_seal ON audit_logs(sha256_seal);`
  ];

  for (const query of sqlStatements) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': conn
      },
      body: JSON.stringify({ query })
    });
    const result = await res.json();
    console.log('Executed:', query.split('\n')[0], '--> Status:', res.status, result.command || result);
  }

  // Insert genesis record if audit_logs is empty
  const countRes = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': conn
    },
    body: JSON.stringify({ query: 'SELECT count(*) as count FROM audit_logs;' })
  });
  const countData = await countRes.json();
  console.log('Current Audit Logs Count:', countData.rows[0].count);

  if (parseInt(countData.rows[0].count, 10) === 0) {
    console.log('Initializing GoBD Genesis Block in Frankfurt Neon DB...');
    const genesisQuery = `
      INSERT INTO audit_logs (domain_id, document_ref, status, discrepancy_count, sha256_seal, previous_seal, details_json)
      VALUES (
        'system',
        'GENESIS-BLOCK-0000',
        'VERIFIED_CLEAN',
        0,
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        '0000000000000000000000000000000000000000000000000000000000000000',
        '{"note": "Haulitz GoBD Cryptographic Genesis Block initialized in Frankfurt eu-central-1"}'::jsonb
      );
    `;
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': conn
      },
      body: JSON.stringify({ query: genesisQuery })
    });
    console.log('Genesis Block seeded successfully.');
  }
}

migrate().catch(console.error);
