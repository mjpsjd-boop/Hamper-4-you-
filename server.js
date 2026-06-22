import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const dbConfig = {
  host: 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
  port: 4000,
  user: '2Q8SMN7VXPUFSmo.root',
  password: '1KxoPM1kYeDIo0rf',
  database: 'sys',
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
};

let pool;

async function initDB() {
  try {
    pool = mysql.createPool(dbConfig);
    console.log('Connected to TiDB');
    
    // Create settings table if not exists
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id VARCHAR(50) PRIMARY KEY,
        content LONGTEXT NOT NULL
      )
    `);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

app.get('/api/settings/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT content FROM site_settings WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(JSON.parse(rows[0].content));
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/settings/:id', async (req, res) => {
  try {
    const content = JSON.stringify(req.body);
    await pool.execute(
      'INSERT INTO site_settings (id, content) VALUES (?, ?) ON DUPLICATE KEY UPDATE content = ?',
      [req.params.id, content, content]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, async () => {
  await initDB();
  console.log(`Server running on port ${PORT}`);
});
