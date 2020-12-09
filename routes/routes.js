//Dependencies
const router = require('express').Router();

//Routes
router.use('/', require('./index'));
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/send', require('./send'));
router.use('/messages', require('./messages'));
router.use('/logout', require('./logout'));
router.use('*', require('./error'));

module.exports = router;
