//Dependencies
const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const path = require('path');
const User = require(path.join(__dirname, 'Models', 'User'));

//Routes
router.get('/', checkAuthenticated, (req, res) => {
  res.render('index', { 
    name: req.user.name,
    email: req.user.email,
    loggedIn: true
  });
});

router.route('/login')
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

router.route('/register')
.get(checkNotAuthenticated, (req, res) => {
  res.render('register', {
    atRegister: true
  });
})
.post(checkNotAuthenticated, async (req, res) => {
  const userObject = {
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)
  };
  console.log(userObject);
  try {
    const postUser = new User(userObject);
    console.log('ok...');
    await postUser.save();
    res.render('login', {
      success: true,
      email: req.body.email,
      atLogin: true
    });
  } 
  catch(err) {
    res.send(err.message);
  }
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/login');
  }
};

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  else {
    next();
  }
};

module.exports = router;
