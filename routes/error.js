//Dependencies
const router = require('express').Router();

//Route error
router.get('/', (req, res) => {
  res.render('error', {
    title: 'Hiba'
  });
});

module.exports = router;
