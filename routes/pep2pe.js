var express = require('express');
var router = express.Router();


var  pep2pe = require('../utils/pep2pe.js')


//ne devrait pas changer a moyen terme. C'est donc, pour l'instant, en dur
/* GET url offer on place-emploi-public.gouv.fr with a offer id */
router.get('/', function (req, res, next) {
  
   var tmp = pep2pe.pep2pe();
    console.log(tmp);
    res.send(tmp);
});

module.exports = router;
