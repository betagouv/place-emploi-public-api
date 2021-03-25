var express = require('express');
var router = express.Router();
var CronJob = require('cron').CronJob;



router.get('/', function (req, res, next) {

    // Chaque minute     var job = new CronJob('0 */1 * * * *', function() {
    // Chaque 10 minutes     var job = new CronJob('0 */10 * * * *', function() {
    // Chaque seconde     var job = new CronJob('0 */1 * * * *', function() {

    var job = new CronJob('* * * * * *', function() {
        console.log('You will see this message every second');
      }, null, true, 'Europe/Paris');
      job.start();
      res.send('Job running ...');

});

module.exports = router;