const request = require('supertest');
const app = require('./app'); 

describe('GET /',  function () {
    it('test du chargement de la racine', function (done) {
        request(app)
            .get('/')
            .expect(200, done)
            
    });
});

describe('GET /pep2pe',  function () {
    it('conversion d\'un fichier d\'export talentsoft(csv) en fichier csv pole emploi', function (done) {
        request(app)
            .get('/pep2pe')
            .expect(200, done)
            
    });
});

describe('GET /sftp',  function () {
    it('récupération d\'un fichier d\'export talentsoft(csv) sur leur FTP.', function (done) {
        request(app)
            .get('/sftp')
            .expect(200, done);
    });
});




