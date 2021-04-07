var express = require('express');
var router = express.Router();
const fs = require('fs');
var request = require('request');
require('dotenv').config();


module.exports = {

    send2pe : function(){
        let filetosend = __dirname + '/../public/offres/last-import-from-ts-pep.csv';

        var options = {
            'method': 'POST',
            'url': process.env.PE_SUBMIT_URL,
            formData: {
              'login': process.env.PE_LOGIN,
              'password':  process.env.PE_PWD,
              'nomFlux': process.env.PE_NOM_FLUX,
              'fichierAenvoyer': filetosend,
              'periodeRef': ' '
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
          });
          


  }
  
  }