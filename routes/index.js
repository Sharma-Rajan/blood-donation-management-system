const express = require('express');
const homeController = require('../controllers/homeController');
const adminController = require('../controllers/adminController');

const router = express.Router();

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
