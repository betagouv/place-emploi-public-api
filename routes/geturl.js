var express = require('express');
var router = express.Router();
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();


/* GET url listing. */
router.get('/', function(req, res, next) {

console.log('searching for  req.query.id ='+ req.query.id);
   

data.append('keywords', '2021-527984');

var config = {
  method: 'post',
  url: 'https://place-emploi-public.gouv.fr/wp-admin/admin-ajax.php?action=search_process',
  headers: { 
    'Cookie': 'PHPSESSID=8531cf7512b391b47dd70144614f6249', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  //var offre=JSON.stringify(response.data)
  console.log('reponse count='+response.data.count)
  if(response.data.count){
      if(response.data.count == 1){
        console.log(response.data.offers[0].url);
        res.send('https://place-emploi-public.gouv.fr'+response.data.offers[0].url);

      } else {
        res.send('too many offers for this id');
      }

  } else {
    console.log('no offer :(');
    res.send('no offer for this id');

  }

 
})
.catch(function (error) {
  console.log(error);
});




});

module.exports = router;
