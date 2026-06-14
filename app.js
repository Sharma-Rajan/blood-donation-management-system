require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');

const app = express();
const publicPath = path.join(__dirname, 'public');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicPath));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'blood-donation-mini-project-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    }
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.admin || null;
  res.locals.year = new Date().getFullYear();
  next();
});

app.use('/', routes);

app.use((req, res) => {
  res.status(404).render('error', {
    pageTitle: 'Page Not Found',
    activePage: '',
    message: 'The requested page could not be found.'
  });
});

app.use((error, req, res, next) => {
  console.error('Application error:', error);
  res.status(500).render('error', {
    pageTitle: 'Server Error',
    activePage: '',
    message: 'Something went wrong on the server. Please try again later.'
  });
});

const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Blood Donation Management System running on port ${port}`);
  });
}

module.exports = app;
