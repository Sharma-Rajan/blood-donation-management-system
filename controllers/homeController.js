const donorModel = require('../models/donorModel');

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const renderHome = (req, res) => {
  res.render('home', {
    pageTitle: 'Home',
    activePage: 'home'
  });
};

const renderRegister = (req, res) => {
  res.render('register', {
    pageTitle: 'Donor Registration',
    activePage: 'register',
    successMessage: req.query.success === '1' ? 'Donor registered successfully.' : '',
    errorMessage: req.query.error || '',
    formData: {
      name: req.query.name || '',
      email: req.query.email || '',
      phone: req.query.phone || '',
      bloodGroup: req.query.bloodGroup || '',
      city: req.query.city || ''
    },
    bloodGroups
  });
};

const validateDonor = ({ name, email, phone, bloodGroup, city }) => {
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim();
  const trimmedPhone = (phone || '').trim();
  const trimmedBloodGroup = (bloodGroup || '').trim();
  const trimmedCity = (city || '').trim();

  if (trimmedName.length < 3) {
    return 'Please enter a valid full name.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail)) {
    return 'Please enter a valid email address.';
  }

  const phonePattern = /^[0-9]{10,15}$/;
  if (!phonePattern.test(trimmedPhone)) {
    return 'Phone number must contain 10 to 15 digits only.';
  }

  if (!bloodGroups.includes(trimmedBloodGroup)) {
    return 'Please select a valid blood group.';
  }

  if (trimmedCity.length < 2) {
    return 'Please enter a valid city name.';
  }

  return '';
};

const registerDonor = async (req, res, next) => {
  try {
    const { name, email, phone, blood_group: bloodGroup, city } = req.body;
    const validationError = validateDonor({ name, email, phone, bloodGroup, city });

    if (validationError) {
      return res.redirect(`/register?error=${encodeURIComponent(validationError)}&name=${encodeURIComponent(name || '')}&email=${encodeURIComponent(email || '')}&phone=${encodeURIComponent(phone || '')}&bloodGroup=${encodeURIComponent(bloodGroup || '')}&city=${encodeURIComponent(city || '')}`);
    }

    await donorModel.createDonor({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      bloodGroup: bloodGroup.trim(),
      city: city.trim()
    });

    return res.redirect('/register?success=1');
  } catch (error) {
    return next(error);
  }
};

const renderSearch = async (req, res, next) => {
  try {
    const bloodGroup = (req.query.blood_group || '').trim();
    const city = (req.query.city || '').trim();
    const searched = Boolean(bloodGroup || city);
    const donors = searched ? await donorModel.searchDonors({ bloodGroup, city }) : [];

    res.render('search', {
      pageTitle: 'Search Donor',
      activePage: 'search',
      donors,
      searched,
      bloodGroup,
      city,
      bloodGroups
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  renderHome,
  renderRegister,
  registerDonor,
  renderSearch,
  bloodGroups
};
