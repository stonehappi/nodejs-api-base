const express = require('express');
const base = require('../controller/base.controller');
const router = express.Router();

router.get('/', base.index);

module.exports = router