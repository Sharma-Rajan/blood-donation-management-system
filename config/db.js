const mysql = require('mysql2/promise');
require('dotenv').config();

let _pool = null;

function getPool() {
  if (!_pool) {
    _pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'blood_donation_db',
      port: Number(process.env.DB_PORT || 3306),
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      connectTimeout: 8000
    });
  }
  return _pool;
}

module.exports = {
  execute: (...args) => getPool().execute(...args),
  query: (...args) => getPool().query(...args)
};

