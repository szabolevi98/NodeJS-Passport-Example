//Dependencies
const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const passport = require('passport');

//Passport config
const initializePassport = require('./passport-config');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

const users = []; //Change to MongoDB or something in a live usage

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
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    console.log(users);
    res.render('login', {
      success: true,
      email: req.body.email,
      atLogin: true
    });
  } catch {
    res.redirect('/register');
  }
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
})

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
