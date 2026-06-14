const express = require('express');
const homeController = require('../controllers/homeController');
const adminController = require('../controllers/adminController');
const db = require('../config/db');

const router = express.Router();

// Temporary health check - remove after debugging
router.get('/health', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT 1 AS ok');
    res.json({
      status: 'ok',
      db: 'connected',
      host: process.env.DB_HOST || 'NOT SET',
      dbName: process.env.DB_NAME || 'NOT SET',
      result: rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      db: 'failed',
      host: process.env.DB_HOST || 'NOT SET',
      error: err.message,
      code: err.code
    });
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
