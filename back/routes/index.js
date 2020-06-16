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

router.post('/create', function (req, res, next) {
  const found = db.get('artists')
    .find({ name: req.body.name })
    .value()

  if (found) return res.status(401).send()

  const artistsLength = db.get('artists')
  .size()
  .value()

  db.set(`artists[${artistsLength}]`, req.body)
  .write()

  res.status(200).send()
})

router.post('/remove', function (req, res, next) {
  try {
    const artists = db.get('artists').value()
    const filtered = [] 
  
    Object.values(artists).forEach(function (a) {
      if (a.name !== req.body.name) filtered.push(a)
    })
  
    db.set('artists', filtered)
    .write()
  
    res.status(200).send()
  } catch (e) {
    console.log(e)
    res.status(404).send()
  }
})

module.exports = router;
