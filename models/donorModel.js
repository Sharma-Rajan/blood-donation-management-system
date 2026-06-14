const db = require('../config/db');

const createDonor = async ({ name, email, phone, bloodGroup, city }) => {
  const sql = 'INSERT INTO donors (name, email, phone, blood_group, city) VALUES (?, ?, ?, ?, ?)';
  const [result] = await db.execute(sql, [name, email, phone, bloodGroup, city]);
  return result;
};

const searchDonors = async ({ bloodGroup, city }) => {
  const conditions = [];
  const values = [];

  if (bloodGroup) {
    conditions.push('UPPER(blood_group) = UPPER(?)');
    values.push(bloodGroup.trim());
  }

  if (city) {
    conditions.push('LOWER(city) LIKE LOWER(?)');
    values.push(`%${city.trim()}%`);
  }

  let sql = 'SELECT id, name, email, phone, blood_group, city, created_at FROM donors';
  if (conditions.length) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }
  sql += ' ORDER BY created_at DESC';

  const [rows] = await db.execute(sql, values);
  return rows;
};

const getAllDonors = async () => {
  const sql = 'SELECT id, name, email, phone, blood_group, city, created_at FROM donors ORDER BY created_at DESC';
  const [rows] = await db.execute(sql);
  return rows;
};

const deleteDonorById = async (id) => {
  const [result] = await db.execute('DELETE FROM donors WHERE id = ?', [id]);
  return result;
};

module.exports = {
  createDonor,
  searchDonors,
  getAllDonors,
  deleteDonorById
};
