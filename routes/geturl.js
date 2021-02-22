var express = require('express');
var router = express.Router();
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();

/* GET url offer on place-emploi-public.gouv.fr with a offer id */
router.get('/', function (req, res, next) {

    //console.log('searching for  req.query.id =' + req.query.id);
    data.append('reference',req.query.id);
    data.append('action','get_reference');
   

    var config = {
        method: 'post',
        url: 'https://place-emploi-public.gouv.fr/wp-admin/admin-ajax.php',
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            //console.log('reponse data='+response.data);
            //console.log(response.data);
            //console.log('reponse data.url ='+response.data.url);
            if (response.data.status = 200 ) {
                if (response.data.message == 'Offre trouvée !') {
                    //console.log(response.data.offers[0].url);
                    res.send(response.data.url);
                } else {
                    res.send('pas d\'offre correspondante');
                }

            } else {
                //console.log('no offer :(');
                res.send('Error :'+response.data.status);
            }
        })
        .catch(function (error) {
            //console.log(error);
            res.send(error);
        });
});

module.exports = router;
