//Dependencies
const router = require('express').Router();
const check = require('./check');

//Route index
router.get('/', check.checkAuthenticated, (req, res) => {
  res.render('index', { 
    title: 'Felhasználó',
    name: req.user.name,
    email: req.user.email,
    date: req.user.date.toUTCString(),
    loggedIn: true
  });
});

module.exports = router;
