var express = require('express');
var router = express.Router();
var request = require('request');
require('dotenv').config();
const fs = require('fs');

module.exports = {
    send2pe : function(callback){
        let filetosend = __dirname + '/../public/offres/last-export-to-pe.csv';
        console.log('sending '+filetosend);
        var options = {
            'method': 'POST',
            'url': process.env.PE_SUBMIT_URL,
            formData: {
              'login': process.env.PE_LOGIN,
              'password':  process.env.PE_PWD,
              'nomFlux': process.env.PE_NOM_FLUX,
              'fichierAenvoyer': fs.createReadStream(filetosend), //'toto'=> @
              'periodeRef': ' '
             
            }
          };
          request(options, function (error, response) {
            if (error) {
              if(callback) callback(error);
              throw new Error(error);
            }
            if(callback) callback(response.body);
            console.log(response.body);
          });

  }
  
  }