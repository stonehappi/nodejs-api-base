const express = require('express');
const base = require('./base')
const router = express.Router();

router.use('/', base)

module.exports = router