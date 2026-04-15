import pg from 'pg';

const connectionString = 'postgresql://postgres:TheUNCODED%40%402026@db.ruiimbaycfkkejwumoak.supabase.co:5432/postgres';

const client = new pg.Client({
  connectionString,
});

async function setup() {
  try {
    await client.connect();
    console.log('Connected to database');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        business_type VARCHAR(100),
        project_details TEXT
      );
    `;

    await client.query(createTableQuery);
    console.log('Table "contact_submissions" created successfully.');

    // RLS (Row Level Security) - allow inserts from anon role for Supabase client
    await client.query(`ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;`);
    
    // Drop policy if exists
    await client.query(`DROP POLICY IF EXISTS "Enable insert for anonymous users" ON contact_submissions;`);

    // Create policy to allow anonymous inserts
    await client.query(`
      CREATE POLICY "Enable insert for anonymous users" 
      ON contact_submissions FOR INSERT 
      TO anon 
      WITH CHECK (true);
    `);
    console.log('RLS policies updated.');

    // --- leads_backup table (safety net, never lose a lead) ---
    const createBackupTableQuery = `
      CREATE TABLE IF NOT EXISTS leads_backup (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        submitted_at TEXT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        business_type VARCHAR(100),
        project_details TEXT
      );
    `;
    await client.query(createBackupTableQuery);
    console.log('Table "leads_backup" created successfully.');

    await client.query(`ALTER TABLE leads_backup ENABLE ROW LEVEL SECURITY;`);
    await client.query(`DROP POLICY IF EXISTS "Enable insert for anonymous users" ON leads_backup;`);
    await client.query(`
      CREATE POLICY "Enable insert for anonymous users" 
      ON leads_backup FOR INSERT 
      TO anon 
      WITH CHECK (true);
    `);
    console.log('RLS policies for leads_backup updated.');
    
    // --- chatbot_leads table ---
    const createChatbotTableQuery = `
      CREATE TABLE IF NOT EXISTS chatbot_leads (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        department VARCHAR(100),
        initial_message TEXT,
        q1_answer TEXT,
        q2_answer TEXT,
        q3_answer TEXT
      );
    `;
    await client.query(createChatbotTableQuery);
    console.log('Table "chatbot_leads" created successfully.');

    await client.query(`ALTER TABLE chatbot_leads ENABLE ROW LEVEL SECURITY;`);
    await client.query(`DROP POLICY IF EXISTS "Enable insert for anonymous users" ON chatbot_leads;`);
    await client.query(`
      CREATE POLICY "Enable insert for anonymous users" 
      ON chatbot_leads FOR INSERT 
      TO anon 
      WITH CHECK (true);
    `);
    console.log('RLS policies for chatbot_leads updated.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

setup();
