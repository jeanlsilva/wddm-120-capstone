var express = require('express');
var router = express.Router();

/* GET appointments listing. */
router.get('/', function(req, res, next) {
  res.send('get appointments list');
});

module.exports = router;
