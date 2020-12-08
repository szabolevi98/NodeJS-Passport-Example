//Dependencies
const router = require('express').Router();

//Route error
router.get('/', (req, res) => {
  res.render('error', {
    title: 'Hiba',
    atError: true,
    route: JSON.stringify(req.originalUrl)
  });
});

module.exports = router;
