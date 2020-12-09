//Dependencies
const router = require('express').Router();
const passport = require('passport');
const path = require('path');
const auth = require(path.join(__dirname, '..', 'passport', 'auth'));

//Route login
router.route('/')
.get(auth.checkNotAuthenticated, (req, res) => {
  res.render('login', {
    title: 'Bejelentkezés',
    atLogin: true
  });
})
.post(auth.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

module.exports = router;
