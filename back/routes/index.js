var express = require('express');
var db = require('../config/db')
var router = express.Router();

router.get('/artists', function (req, res, next) {
  const artists = db.get('artists').value()
  res.status(200).json(artists);
});

router.post('/update', function (req, res, next) {
  const found = db.get('artists')
    .find({ name: req.body.name })
    .assign({
      downvotes: req.body.downvotes,
      upvotes: req.body.upvotes
    })
    .write()

  res.status(200).json(found);
});

module.exports = router;
