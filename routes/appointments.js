var express = require('express');
var router = express.Router();
const appointmentCtrl = require('../controllers/appointments');

/* GET appointments listing. */
router.get('/', appointmentCtrl.list);

module.exports = router;
