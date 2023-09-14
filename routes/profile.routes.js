const router = require('express').Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    // if not logged in
    res.redirect('/auth/login');
  } else {
    // if logged in
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  res.render('profile.ejs', { user: req.user });
});

module.exports = router;
