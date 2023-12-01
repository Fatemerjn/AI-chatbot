const express = require('express');
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const passportSetup = require('./config/passport.setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const ejs = require('ejs');

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');

app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
// mongoose.connect(keys.mongodb.dbURI);

// set up routes
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/pricing', (req, res) => {
  res.render('pricing.ejs');
});

app.get('/resolve', (req, res) => {
  res.render('resolve.ejs');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}
  link - http://localhost:${PORT}`);
});
