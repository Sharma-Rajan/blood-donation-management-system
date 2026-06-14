const crypto = require('crypto');
const db = require('../config/db');

const findAdminByUsername = async (username) => {
  const [rows] = await db.execute('SELECT id, username, password FROM admin WHERE username = ?', [username]);
  return rows[0] || null;
};

const verifyPasswordRecord = (plainPassword, storedPassword) => {
  if (!plainPassword || !storedPassword) {
    return false;
  }

  const parts = storedPassword.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') {
    return false;
  }

  const iterations = Number(parts[1]);
  const salt = parts[2];
  const expectedHash = parts[3];
  const derivedHash = crypto.pbkdf2Sync(plainPassword, salt, iterations, expectedHash.length / 2, 'sha256').toString('hex');

  return crypto.timingSafeEqual(Buffer.from(expectedHash, 'hex'), Buffer.from(derivedHash, 'hex'));
};

module.exports = {
  findAdminByUsername,
  verifyPasswordRecord
};
