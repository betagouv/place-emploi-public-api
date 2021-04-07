var express = require('express');
var router = express.Router();
var CronJob = require('cron').CronJob;
var  send2pe = require('../utils/send2pe.js');
const nodemailer = require("nodemailer");
require('dotenv').config();


//send2pe

async function sendnotif() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVEUR,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_KEY // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Chaib Martinez" <chaib.martinez@beta.gouv.fr>', // sender address
    to: "chaib@close-more.deals", // list of receivers ex :   to: "chaib@example.com, baz@example.com", 
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


router.get('/', function (req, res, next) {

    // Chaque minute     var job = new CronJob('0 */1 * * * *', function() {
    // Chaque 10 minutes     var job = new CronJob('0 */10 * * * *', function() {
    // Chaque seconde     var job = new CronJob('0 */1 * * * *', function() {

    var job = new CronJob('5 * * * * *', function() {
        console.log(Date());
        sendnotif().catch(console.error);

        var tmp = send2pe.send2pe();
        console.log(tmp);

      }, null, true, 'Europe/Paris');
      job.start();
      res.send('Job running ...');

});

module.exports = router;