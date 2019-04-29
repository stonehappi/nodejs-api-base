const express = require('express');
const userRoute = require('./user');
const hotspotRoute = require('./hotspot');
const provinceRoute = require('./province');
const router = express.Router();

router.get('/', (req, res) => res.send("welcome"));

router.use('/user', userRoute)
router.use('/hotspot', hotspotRoute)
router.use('/province', provinceRoute)

module.exports = router