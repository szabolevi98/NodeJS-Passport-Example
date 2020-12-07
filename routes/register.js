//Dependencies
const router = require('express').Router();
const bcrypt = require('bcrypt');
const path = require('path');
const User = require(path.join(__dirname, '..', 'Models', 'User'));

//Routes register
router.route('/')
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

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  else {
    next();
  }
};

module.exports = router;
