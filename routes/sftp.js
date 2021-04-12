var express = require('express');
var router = express.Router();
var  sftp_util = require('../utils/sftp.js')


router.get('/', function (req, res, next) {


    let start = new Date();
    let yesterday = new Date();
    start = start.getFullYear()+(start.getMonth()+1).toString().padStart(2, "0")+start.getDate().toString().padStart(2, "0");
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.getFullYear()+(yesterday.getMonth()+1).toString().padStart(2, "0")+yesterday.getDate().toString().padStart(2, "0");
    console.log(yesterday);
        let ts_file = 'Offres_PE_'+start+'.csv';
    //ex = Offres_PE_20210407.csv
    //let remotePath = '/TestExportRecrutement/Data/Offres_PE_20210407.csv';
    let remotePath = '/ExportRecrutement/Data/'+ts_file;
    let remotePathBackup = '/ExportRecrutement/Data/Offres_PE_'+yesterday+'.csv';
    /// let dst = fs.createWriteStream(__dirname + '/../public/offres/last-import-from-ts-pep.csv');
    sftp_util.get_file_from_pep_ts_sftp(remotePath,remotePathBackup,__dirname + '/../public/offres/last-import-from-ts-pep.csv');
    ///TestExportRecrutement/Data/Offres_PE_20210406.csv
 
res.send('récupération du fichier '+remotePath);

});

module.exports = router;