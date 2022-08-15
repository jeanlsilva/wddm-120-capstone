var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/', usersCtrl.list);

router.get('/:id', usersCtrl.listOne);

router.post('/', usersCtrl.create);

router.put('/:id', usersCtrl.update);

router.delete('/:id', usersCtrl.deleteUser);

module.exports = router;
