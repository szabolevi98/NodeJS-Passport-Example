//Dependencies
const router = require('express').Router();

//Routes
router.use('/', require('./index'));
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/logout', require('./logout'));
router.use('*', require('./error'));

module.exports = router;
