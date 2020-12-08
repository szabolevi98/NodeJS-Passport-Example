//Dependencies
const router = require('express').Router();
const bcrypt = require('bcrypt');
const path = require('path');
const userModel = require(path.join(__dirname, '..', 'models', 'user'));
const check = require('./check');

//Route register
router.route('/')
.get(check.checkNotAuthenticated, (req, res) => {
  res.render('register', {
    title: 'Regisztráció',
    atRegister: true
  });
})
.post(check.checkNotAuthenticated, async(req, res) => {
  const userObject = {
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)
  };
  console.log(userObject);
  try {
    const postUser = new userModel(userObject);
    await postUser.save();
    res.render('login', {
      title: 'Bejelentkezés',
      success: true,
      email: req.body.email,
      atLogin: true
    });
  } 
  catch(err) {
    res.render('error', {
      title: 'Hiba',
      atError: true,
      errorMessage: err.message
    });
  }
});

module.exports = router;
