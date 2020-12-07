//Dependencies
const express = require('express');
const router = express();
const passport = require('passport');

//Route login
router.route('/')
.get(checkNotAuthenticated, (req, res) => {
  res.render('login', {
    atLogin: true
  });
})
.post(checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  else {
    next();
  }
};

module.exports = router;
