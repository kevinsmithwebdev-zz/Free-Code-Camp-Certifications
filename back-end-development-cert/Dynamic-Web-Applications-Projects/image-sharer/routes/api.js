var express = require('express')
var router = express.Router()
var probe = require('probe-image-size');

router.get('/exists/:filename', function(req, res) {
  probe(req.params.filename)
    .then(result => {
      res.send({ exists: true, height: result.height, width: result.width })
    })
    .catch(err => {
      res.send({ exists: false })
    })
})

module.exports = router
