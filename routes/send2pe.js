var express = require('express');
var router = express.Router();
var  send2pe = require('../utils/send2pe.js')


router.get('/', function (req, res, next) {

 send2pe.send2pe();


res.send('send2pe');

});

module.exports = router;