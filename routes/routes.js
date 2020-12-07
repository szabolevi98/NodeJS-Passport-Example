//Dependencies
const express = require('express');
const router = express();

//Routes
router.use('/', require('./index'));
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/logout', require('./logout'));
router.use('*', require('./error'));

module.exports = router;
