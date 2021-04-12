var express = require('express');
var router = express.Router();
const fs = require('fs');
require('dotenv').config();
let Client = require('ssh2-sftp-client');

module.exports = {

  get_file_from_pep_ts_sftp : function(remotePath,remotePathBackup, localPath,callback){
    let sftp = new Client();
    let dst = fs.createWriteStream(localPath);
     // Ex : localPath = __dirname + '/../public/offres/last-import-from-ts-pep.csv'
    sftp.connect({
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
        //console.log('get_file_from_pep_ts_sftp : Reception du fichier ok');
        if(callback) callback('Reception du fichier '+remotePath + ' ok. Enregistrement dans '+localPath + ' pour export (à venir) PE OK')
        sftp.end();
      })
      .catch(err => {
        console.error(err.message);
        //console.log('get_file_from_pep_ts_sftp : Reception du fichier ko. Tenative de récuperation de fichier de la veille ='+remotePathBackup);
        sftp.get(remotePathBackup, dst).then(() => {
          
          //console.log('get_file_from_pep_ts_sftp : Reception du fichier de BACKUP ok');
          if(callback) callback('Fichier du jours absent. Reception du fichier de la veille '+remotePathBackup + ' OK. Enregistrement dans '+localPath + ' pour export PE (à venir)OK')

          sftp.end();
        })
        .catch(err => {
          console.error(err.message);
          if(callback) callback('Erreur de récupérationdu fichier du jours. Echec de la tentative de récupération du fichier de la veille : '+err.message);

  
        });
        
        ;

      });
}

}