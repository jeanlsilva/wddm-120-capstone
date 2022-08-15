var express = require('express');
var router = express.Router();
const sessionsCtrl = require('../controllers/sessions');

router.post('/', sessionsCtrl.login);

module.exports = router;
