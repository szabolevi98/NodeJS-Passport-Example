//Dependencies
const router = require('express').Router();
const path = require('path');
const auth = require(path.join(__dirname, '..', 'passport', 'auth'));

//Route index
router.get('/', auth.checkAuthenticated, (req, res) => {
  res.render('index', { 
    title: 'Felhasználó',
    name: req.user.name,
    email: req.user.email,
    date: req.user.date.toUTCString(),
    loggedIn: true,
    atProfile: true
  });
});

module.exports = router;
