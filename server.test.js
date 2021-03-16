const request = require('supertest');
const app = require('./app'); 


describe('GET /pep2pe', function () {
    it('conversion d\'un fichier d\'export talentsoft(csv) en fichier csv pole emploi', function (done) {
        request(app)
            .get('/pep2pe?file=export_offres_PE_10-mars-2021.csv')
            .expect(200, done);
    });
});



