var express = require('express');
var router = express.Router();
var CronJob = require('cron').CronJob;
var send2pe = require('../utils/send2pe.js');
var sftp_util = require('../utils/sftp.js');
var pep2pe = require('../utils/pep2pe.js');
const nodemailer = require("nodemailer");
require('dotenv').config();


//send2pe

async function sendnotif(objet, msg) {
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
    subject: objet, // Subject line
    text: msg, // plain text body
    html: msg, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


router.get('/', function (req, res, next) {
  var notifmsg = '';




  // Chaque minute     var job = new CronJob('0 */1 * * * *', function() {
  // Chaque 10 minutes     var job = new CronJob('0 */10 * * * *', function() {
  // Chaque seconde     var job = new CronJob('0 */1 * * * *', function() {
    var get_ts_file = new CronJob('00 30 04 * * 0-6', function () {
    console.log('job1' + Date());
    let start = new Date();
    let yesterday = new Date();
    start = start.getFullYear() + (start.getMonth() + 1).toString().padStart(2, "0") + start.getDate().toString().padStart(2, "0");
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.getFullYear() + (yesterday.getMonth() + 1).toString().padStart(2, "0") + yesterday.getDate().toString().padStart(2, "0");
    console.log(yesterday);
    let ts_file = 'Offres_PE_' + start + '.csv';
    //ex = Offres_PE_20210407.csv
    //let remotePath = '/TestExportRecrutement/Data/Offres_PE_20210407.csv';
    let remotePath = '/ExportRecrutement/Data/' + ts_file;
    let remotePathBackup = '/ExportRecrutement/Data/Offres_PE_' + yesterday + '.csv';
    /// let dst = fs.createWriteStream(__dirname + '/../public/offres/last-import-from-ts-pep.csv');
    sftp_util.get_file_from_pep_ts_sftp(remotePath, remotePathBackup, __dirname + '/../public/offres/last-import-from-ts-pep.csv', function (callback) {
      console.log('resultat de pep2pe = ' + callback);
      notifmsg = callback;
      sendnotif('Import de l\'export TS', notifmsg);
    });
    ///TestExportRecrutement/Data/Offres_PE_20210406.csv


  }, null, true, 'Europe/Paris');

  var pepconversionpe = new CronJob('00 30 08 * * 0-6', function () {
    console.log('👉 job2 pepconversionpe ' + Date());
    var tmp = pep2pe.pep2pe('', '', function (callback) {
      console.log('resultat de pep2pe = ' + callback);
      notifmsg = callback;
      sendnotif('PEP2PE : import depuis TS', notifmsg);
    });
  }, null, true, 'Europe/Paris');

  var sendtopeandnotif = new CronJob('00 15 11 * * 0-6', function () {
    console.log('job3 sendtopeandnotif' + Date());
    var tmp = send2pe.send2pe(function (callback) {
      console.log('resultat de pep2pe = ' + callback);
      notifmsg = callback;
      sendnotif('PEP2PE : envoi sur PE des offres', notifmsg);
    });
    
  }, null, true, 'Europe/Paris');


  get_ts_file.start();
  pepconversionpe.start();
  sendtopeandnotif.start();
  res.send('Job running ...');


});




module.exports = router;