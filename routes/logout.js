//Dependencies
const router = require('express').Router();

//Route logout
router.get('/', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

module.exports = router;
