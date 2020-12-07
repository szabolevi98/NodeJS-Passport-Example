//Dependencies
const router = require('express').Router();

//Routes index
router.get('/', checkAuthenticated, (req, res) => {
  res.render('index', { 
    name: req.user.name,
    email: req.user.email,
    loggedIn: true
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/login');
  }
};
module.exports = router;
