const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login.ejs');
});

router.get('/register', (req, res) => {
  res.render('register.ejs');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// google auth
// router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// google callback
// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//   res.redirect('/');
// });

// stripe auth
router.get('/stripe', passport.authenticate('stripe', { scope: 'read_write' }));

// stripe callback
router.get('/stripe/redirect', passport.authenticate('stripe'), (req, res) => {
  res.redirect('/profile');
});

module.exports = router;
