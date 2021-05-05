var express = require('express');
var router = express.Router();
var CronJob = require('cron').CronJob;
var send2pe = require('../utils/send2pe.js');
var sftp_util = require('../utils/sftp.js');
var pep2pe = require('../utils/pep2pe.js');
const nodemailer = require("nodemailer");
require('dotenv').config();

// Récupération le matin à 04h30 du fichier des exports des offres Talentsoft
// Traitement du fichier Talentsoft à 08h30, création du fichier des offres ) envoyer à Pole emploi
// Envoi du fichier à Pôle emploi à 11h01
console.log('cron start...  ');
async function sendnotif(objet, msg) {
  
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVEUR,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_KEY 
    },
  });


  let info = await transporter.sendMail({
    from: '"Chaib Martinez" <chaib.martinez@beta.gouv.fr>', 
    to: "chaib.martinez@beta.gouv.fr, pep-flux-apiftp@finances.gouv.fr", // list of receivers ex :   to: "xxxxx@example.com, baz@example.com", 
    subject: objet, // Subject line
    text: msg, // plain text body
    html: msg, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}


var notifmsg = '';

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
      notifmsg += '\r\nPour télécharger le fichier qui a été récupéré sur le FTP Talentsoft et comprennant les offres avant traitement';
      notifmsg += '\r\ncliquez ici : https://place-emploi-public-api.osc-fr1.scalingo.io/offres/last-import-from-ts-pep.csv ';

      sendnotif('🧲 Import de l\'export TalentSoft', notifmsg);
    });

  }, null, true, 'Europe/Paris');

  var pepconversionpe = new CronJob('00 30 08 * * 0-6', function () {
    console.log('👉 job2 pepconversionpe ' + Date());
    var tmp = pep2pe.pep2pe('', '', function (callback) {
      console.log('resultat de pep2pe = ' + callback);
      notifmsg = callback;
      notifmsg += '\r\nPour télécharger le fichier qui sera envoyé à Pôle emploi';
      notifmsg += '\r\ncliquez ici : https://place-emploi-public-api.osc-fr1.scalingo.io/offres/last-export-to-pe.csv ';
      sendnotif('🛠 Conversion des offres PEP dans le format Pôle emploi', notifmsg);
    });
  }, null, true, 'Europe/Paris');

  var sendtopeandnotif = new CronJob('00 01 11 * * 0-6', function () {
    console.log('job3 sendtopeandnotif' + Date());
    var tmp = send2pe.send2pe(function (callback) {
      console.log('resultat de pep2pe = ' + callback);
      notifmsg = '✅';
      notifmsg += callback;
      notifmsg += '\r\nAttention, ce n\'est pas parce que le fichier a été envoyé qu\'il a été correctement traité par Pôle emploi';
      notifmsg += '\r\npour connaitre l\'intégration effective des offres, rendez-vous sur https://www.portail-emploi.fr/portail-tap' ;

      sendnotif('🚀 Envoi sur PE des offres', notifmsg);
    });
    
  }, null, true, 'Europe/Paris');


  
  get_ts_file.start();
  pepconversionpe.start();
  sendtopeandnotif.start();
  //testcron.start();
  //res.send('Job is running');

  console.log('cron running...  ');



