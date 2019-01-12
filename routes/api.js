var express = require('express');
var request = require('request');
var router = express.Router();

//hit our yesno.wtf api endpoint
router.get('/', function(req, res, next) {
  request(`https://yesno.wtf/api`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      res.json(data);
    }
  });
});

//hit our yesno.wtf api endpoint with force param
router.get('/:force', function(req, res, next) {
  request(`https://yesno.wtf/api?force=${req.params.force}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      res.json(data);
    }
  });
});

module.exports = router;
