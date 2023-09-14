const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const StripeStrategy = require('passport-stripe').Strategy;
const keys = require('./keys');
const User = require('../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // strategy options
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // callback for strategy

      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // user already exists
          console.log('user exists' + currentUser);
          done(null, currentUser);
        } else {
          // user not found, create it
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log('new user created' + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

passport.use(
  new StripeStrategy(
    {
      clientID: keys.stripe.clientID,
      clientSecret: keys.stripe.clientSecret,
      callbackURL: 'http://localhost:8000/auth/stripe/redirect',
    },
    function (accessToken, refreshToken, stripe_properties, done) {
      // handle auth
      User.findOne({ stripeId: stripe_properties.stripe_user_id }).then(
        (currentUser) => {
          if (currentUser) {
            // user already exists
            console.log('user exists' + currentUser);
            done(null, currentUser);
          } else {
            // user not found, create it
            new User({
              stripeId: stripe_properties.stripe_user_id,
            })
              .save()
              .then((newUser) => {
                console.log('new user created' + newUser);
                done(null, newUser);
              });
          }
        }
      );

      // console.log(stripe_properties.stripe_user_id);
    }
  )
);
