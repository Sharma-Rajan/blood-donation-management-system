const donorModel = require('../models/donorModel');
const adminModel = require('../models/adminModel');

const renderLogin = (req, res) => {
  res.render('admin-login', {
    pageTitle: 'Admin Login',
    activePage: 'admin',
    errorMessage: req.query.error || ''
  });
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = await adminModel.findAdminByUsername((username || '').trim());

    if (!admin || !adminModel.verifyPasswordRecord(password || '', admin.password)) {
      return res.render('admin-login', {
        pageTitle: 'Admin Login',
        activePage: 'admin',
        errorMessage: 'Invalid username or password.'
      });
    }

    req.session.admin = {
      id: admin.id,
      username: admin.username
    };

    return req.session.save(() => res.redirect('/admin/dashboard'));
  } catch (error) {
    return next(error);
  }
};

const ensureAdmin = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  }
  return res.redirect('/admin/login');
};

const dashboard = async (req, res, next) => {
  try {
    const donors = await donorModel.getAllDonors();
    res.render('dashboard', {
      pageTitle: 'Admin Dashboard',
      activePage: 'dashboard',
      donors,
      successMessage: req.query.deleted === '1' ? 'Donor record deleted successfully.' : '',
      adminUser: req.session.admin
    });
  } catch (error) {
    next(error);
  }
};

const deleteDonor = async (req, res, next) => {
  try {
    await donorModel.deleteDonorById(req.params.id);
    return res.redirect('/admin/dashboard?deleted=1');
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }
    res.clearCookie('connect.sid');
    return res.redirect('/');
  });
};

module.exports = {
  renderLogin,
  login,
  ensureAdmin,
  dashboard,
  deleteDonor,
  logout
};
