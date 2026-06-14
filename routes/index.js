const express = require('express');
const homeController = require('../controllers/homeController');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Diagnostic: pure ping, no DB, no EJS
router.get('/ping', (req, res) => {
  res.json({ pong: true, time: new Date().toISOString(), env: process.env.DB_HOST || 'NOT SET' });
});

// Diagnostic: DB health check
router.get('/health', async (req, res) => {
  const db = require('../config/db');
  try {
    const [rows] = await db.execute('SELECT 1 AS ok');
    res.json({ status: 'ok', db: 'connected', host: process.env.DB_HOST || 'NOT SET' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message, code: err.code });
  }
});

router.get('/', homeController.renderHome);
router.get('/register', homeController.renderRegister);
router.post('/register', homeController.registerDonor);
router.get('/search', homeController.renderSearch);

router.get('/admin/login', adminController.renderLogin);
router.post('/admin/login', adminController.login);
router.get('/admin/dashboard', adminController.ensureAdmin, adminController.dashboard);
router.post('/admin/donor/:id/delete', adminController.ensureAdmin, adminController.deleteDonor);
router.get('/admin/logout', adminController.ensureAdmin, adminController.logout);

module.exports = router;
