var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');
const sessionsCtrl = require('../controllers/sessions');

/* GET users listing. */
router.get('/', usersCtrl.list);

router.post('/', usersCtrl.create)

router.post('/authenticate', sessionsCtrl.login);

module.exports = router;
