var express = require('express');
var router = express.Router();
var noteService = require('../src/babeled/service/servicelayer');

router.get('/:noteid', function(req, res, next) {
  res.send(req.params.noteid);
});

module.exports = router;
