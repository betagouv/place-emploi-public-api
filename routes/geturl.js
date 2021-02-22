var express = require('express');
var router = express.Router();
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();

/* GET url offer on place-emploi-public.gouv.fr with a offer id */
router.get('/', function (req, res, next) {

    //console.log('searching for  req.query.id =' + req.query.id);
    data.append('keywords',req.query.id);

    var config = {
        method: 'post',
        url: 'https://place-emploi-public.gouv.fr/wp-admin/admin-ajax.php?action=search_process',
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            //console.log('reponse count='+response.data.count)
            if (response.data.count) {
                if (response.data.count == 1) {
                    //console.log(response.data.offers[0].url);
                    res.send('https://place-emploi-public.gouv.fr' + response.data.offers[0].url);
                } else {
                    res.send('too many offers for this id');
                }

            } else {
                //console.log('no offer :(');
                res.send('no offer for this id');
            }
        })
        .catch(function (error) {
            //console.log(error);
            res.send(error);
        });
});

module.exports = router;
