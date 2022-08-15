var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');
const providersCtrl = require('../controllers/providers');

router.get('/', usersCtrl.listProviders);

router.get('/:id/month-availability', providersCtrl.getAvailabilities);

module.exports = router;

