var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/', usersCtrl.list);

router.post('/', usersCtrl.create)

module.exports = router;
