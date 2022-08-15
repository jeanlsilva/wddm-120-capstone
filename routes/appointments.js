var express = require('express');
var router = express.Router();
const appointmentCtrl = require('../controllers/appointments');

/* GET appointments listing. */
router.get('/', appointmentCtrl.list);

router.get('/:id', appointmentCtrl.listOne);

router.get('/user/:id', appointmentCtrl.listByUser);

router.post('/', appointmentCtrl.create);

module.exports = router;
