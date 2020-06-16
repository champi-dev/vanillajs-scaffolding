var express = require('express');
var db = require('../config/db')
var router = express.Router();

router.get('/', function(req, res, next) {
  const artists = db.get('artists').value()
  res.status(200).json(artists);
});

module.exports = router;
