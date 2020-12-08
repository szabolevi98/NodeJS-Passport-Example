//Dependencies
const router = require('express').Router();
const passport = require('passport');
const check = require('./check');

//Route login
router.route('/')
.get(check.checkNotAuthenticated, (req, res) => {
  res.render('login', {
    title: 'Bejelentkezés',
    atLogin: true
  });
})
.post(check.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

module.exports = router;
