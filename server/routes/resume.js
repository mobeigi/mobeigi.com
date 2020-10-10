var express = require('express');
var router = express.Router();
var fs = require('fs');

var validKeyArray = fs.readFileSync('private/resume/authKeyList.txt').toString().split("\n");
var paramError = { error: "The 'authKey' parameter is required."};
var authKeyError = { error: "Provided 'authKey' is not authorised."};

router.post('/auth', function(req, res, next) {
  if (req.body.authKey === undefined) {
    return res.status(422).contentType('json').send(JSON.stringify(paramError)).end();
  }
  var key = req.body.authKey;
  if (validKeyArray.indexOf(key) > -1) {
    return res.status(204).contentType('json').end();
  }
  else {
    return res.status(401).contentType('json').send(JSON.stringify(authKeyError));
  }
});

router.post('/download', function(req, res, next) {
  if (req.body.authKey === undefined) {
    return res.status(422).contentType('json').send(JSON.stringify(paramError)).end();
  }
  var key = req.body.authKey;
  if (validKeyArray.indexOf(key) > -1) {
    return res.download('private/resume/resume.pdf');
  }
  else {
    return res.status(401).contentType('json').send(JSON.stringify(authKeyError));
  }
});

module.exports = router;
