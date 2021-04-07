var express = require('express');
var router = express.Router();
const fs = require('fs');
require('dotenv').config()
var  sftp_util = require('../utils/sftp.js')
let Client = require('ssh2-sftp-client');



router.get('/', function (req, res, next) {

    let sftp = new Client();
    let start = new Date();
    start = start.getFullYear()+(start.getMonth()+1).toString().padStart(2, "0")+start.getDate().toString().padStart(2, "0");
    let ts_file = 'Offres_PE_'+start+'.csv';
    //ex = Offres_PE_20210407.csv
    //let remotePath = '/TestExportRecrutement/Data/Offres_PE_20210407.csv';
    let remotePath = '/TestExportRecrutement/Data/'+ts_file;
    let dst = fs.createWriteStream(__dirname + '/../public/offres/last-import-from-ts-pep.csv');
    sftp_util.get_file_from_pep_ts_sftp(remotePath,__dirname + '/../public/offres/last-import-from-ts-pep.csv');
    ///TestExportRecrutement/Data/Offres_PE_20210406.csv
 
    /* sftp.connect({
        host: process.env.SFTP_HOST,
        port: process.env.SFTP_PORT,
        username: process.env.SFTP_USER,
        password: process.env.SFTP_PWD,
        algorithms: {
            serverHostKey: [
              'ssh-dss'
            ]
          }
      }).then(() => {
        return sftp.get(remotePath, dst);
      })
      .then(() => {
          res.send('Reception du fichier ok')
        sftp.end();
      })
      .catch(err => {
        console.error(err.message);
      });
    */
res.send('récupération du fichier '+remotePath);

});

module.exports = router;