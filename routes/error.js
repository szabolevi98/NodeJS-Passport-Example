//Dependencies
const router = require('express').Router();

//Route error
router.get('/', (req, res) => {
  res.render('error', {
    title: 'Hiba',
    route: JSON.stringify(req.originalUrl)
  });
});

module.exports = router;
