var express = require('express');
var router = express.Router();
var FormData = require('form-data');
const csv = require('csv-parser');
var axios = require('axios');
const fs = require('fs')
var accents = require('remove-accents');
let export_rime_rome = require('../utils/rime_rome.js');
var now = new Date();

//ne devrait pas changer a moyen terme. C'est donc, pour l'instant, en dur
/* GET url offer on place-emploi-public.gouv.fr with a offer id */
router.get('/', function (req, res, next) {
    var offresPEP = [];
    var nb_offres_export = 0;
    var nb_offres_url = 0;
    let tmp_offres_pe = [];
    var tmp_date = Date.now();
    var stream = fs.createWriteStream(__dirname + '/../public/offres/' + tmp_date + '-export-pep2pe.csv');
    stream.on('error', function (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    });

    stream.once('open', (fd) => {
        stream.write("Par_URL_offre|Code_OGR|Par_ref_offre|Description|Libelle_metier_OGR|DEP_libelle|DEP_cle|Par_cle|Par_nom|Off_experience_duree_min|Exp_cle|Exp_libelle|Dur_cle_experience|NTC_cle|TCO_cle|Off_contrat_duree_MO|Pay_cle|Off_date_creation|Off_date_modification\n");
    });
    //fichier test = export_offres_PE_test.csv
    var talentsoft_export_file = '';
    if (req.query.file) {
        talentsoft_export_file = req.query.file;
    }
    else {
        talentsoft_export_file = 'export_offres_PE_18mars2021.csv'
    }
    fs.createReadStream(__dirname + '/../public/offres/' + talentsoft_export_file)
        .on('error', function (err) {
            res.status(500);
            res.send(err);
        })
        .pipe(csv({ 'separator': ';' }))
        .on('data', (data) => offresPEP.push(data))
        .on('end', () => {

            /// console.log("🔎 Nombres de lignes importées: " + offresPEP.length);
            var i = 0;

            for (i = 0; i < offresPEP.length; i++) {
                var data = new FormData();

                /// console.log("Traitement de OfferID = " + offresPEP[i].OfferID); // 527929
                // mise en majuscule du libellé du métier et suppréssion des parenthèses . 
                // Responsable des études et applications (FPT - A7A/08) => RESPONSABLE DES ÉTUDES ET APPLICATIONS
                var Libelle_metier_pep = offresPEP[i].JobDescription_PrimaryProfile_.toUpperCase().replace(/ *\([^)]*\) */g, "");
                ///  console.log('offre pe Par_ref_offre============== 👉');

                //URL = concaténation de JobDescriptionTranslation_JobTitle (avec les espaces convertis en -) + la chaine de caractère «-référence-» + OfferID
                //https://place-emploi-public.gouv.fr/offre-emploi/gestionnaire-sharepoint-et-serveurs-hf-reference-2021-531419/


                var tmp_url = accents.remove(offresPEP[i].JobDescriptionTranslation_JobTitle_).toLowerCase().replaceAll(/ |\'/g, '-').replaceAll('/', '').replaceAll('|', '');
                tmp_url = 'https://place-emploi-public.gouv.fr/offre-emploi/' + tmp_url.replaceAll(/\(|\)|\.|\,|\«|\»|\"|\°/g, '').replace(/(\r\n|\n|\r)/gm, '') + '-reference-' + offresPEP[i].Offer_Reference_;
                /// console.log('👍 NEW URL2= ' + tmp_url);


                /// console.log('Libelle_metier_pep = ' + Libelle_metier_pep);

                var tmp_rime_rome_match = export_rime_rome.rime_rome.find(metier => metier.lib_rime == Libelle_metier_pep);
                if (tmp_rime_rome_match) {

                    offresPEP[i].JobDescriptionTranslation_Description1_ = offresPEP[i].JobDescriptionTranslation_Description1_.replace(/(\r\n|\n|\r)/gm, "\\n").replaceAll('|', '');
                    //console.log( "😱"+offresPEP[i].JobDescriptionTranslation_Description1_+" > "+offresPEP[i].JobDescriptionTranslation_Description1_.length );

                    if (offresPEP[i].JobDescriptionTranslation_Description1_.length < 50) {
                        ///  console.log('❌ ❌ descriptif trop petit');
                        continue;
                    }

                    if (offresPEP[i].JobDescriptionTranslation_Description1_.length > 4800) {
                        ///  console.log('🪚 on coupe a 4800 caractère le descriptif');
                        offresPEP[i].JobDescriptionTranslation_Description1_ = offresPEP[i].JobDescriptionTranslation_Description1_.substring(0, 4799);
                    }

                    nb_offres_export++;
                    /// console.log("✅ correspondance trouvé entre offre et code ROME I=" + i); // ex : Libelle_metier_pep = RESPONSABLE ACHAT => { lib_rime: 'RESPONSABLE ACHAT', code_ogr: '12121' }
                    /*
                    var tmp_data_pe = {
                        'Par_URL_offre': tmp_url,
                        'Code_ogr': tmp_rime_rome_match.code_ogr,
                        'Par_ref_offre': offresPEP[i].OfferID,
                        'Description': offresPEP[i].JobDescriptionTranslation_Description1_,
                        'Libelle_metier_OGR' : offresPEP[i].JobDescriptionTranslation_JobTitle_,
                        'Par_cle': 'PEP',
                        'Par_nom': 'PEP',
                        'Off_experience_duree_min': '0',
                        'Exp_cle': 'D',
                        'Exp_libelle': 'Debutant',
                        'Dur_cle_experience': 'AN',
                        'NTC_cle': 'E1',
                        'TCO_cle': 'CDD',
                        'Off_contrat_duree_MO': '36',
                        'Pay_cle': '1',
                        'Off_date_creation': '01/03/2021',
                        'Off_date_modification': ''
                    }
                    tmp_offres_pe.push(tmp_data_pe);
                    */

                    let dep_nom = '';
                    let dep_num = ''

                    if (offresPEP[i].Location_Department_Department_ != '') {
                        let dep = offresPEP[i].Location_Department_Department_.split("(");
                        dep_nom = dep[0];
                        dep_num = String(dep[1]);
                        dep_num = dep_num.replace(')', '').replace('\'', '');
                    }
                    data.append('reference', offresPEP[i].Offer_Reference_);
                    data.append('action', 'get_reference');
                    let config = {
                        method: 'post',
                        url: 'https://place-emploi-public.gouv.fr/wp-admin/admin-ajax.php',
                        headers: {
                            ...data.getHeaders()
                        },
                        ref: offresPEP[i].Offer_Reference_,
                        OfferID: offresPEP[i].OfferID,
                        Offer_Reference_: offresPEP[i].Offer_Reference_,
                        iteration: i,
                        code_ogr: tmp_rime_rome_match.code_ogr,
                        description: offresPEP[i].JobDescriptionTranslation_Description1_,
                        backup_url: tmp_url,
                        data: data
                    };
                    var annee   = now.getFullYear();
                    var mois    =  ("0" + (now.getMonth() + 1)).slice(-2);
                    var jour    = now.getDate();
                    nb_offres_url++;
                    fs.appendFile(__dirname + '/../public/offres/' + tmp_date + '-export-pep2pe.csv', "https://place-emploi-public.gouv.fr/offre-emploi/"+config.Offer_Reference_ + "|" + config.code_ogr + "|" + config.OfferID + "|" + offresPEP[config.iteration].JobDescriptionTranslation_Description1_ + "|" + offresPEP[config.iteration].JobDescriptionTranslation_JobTitle_.replace(/(\r\n|\n|\r)/gm, '') + "|" + dep_nom + "|" + dep_num + "|PEP|PEP|0|D|Debutant|AN|E1|CDD|36|1|"+jour+"/"+mois+"/"+annee+"|\n", function (err) {
                        if (err) throw err;
                        /// console.log('Saved! ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️');
                    });

                    
                } else {
                    /// console.log("❌ pas de correspondance trouvé entre offre et code ROME :");

                    continue;
                }
            }

           
                /// console.log('écriture fichier');
                res.send("<h1>" + offresPEP.length + " offres importées depuis PEP / " + nb_offres_export + " avec correspondanc RIME-ROME  (" + Math.round(eval((nb_offres_export * 100) / offresPEP.length)) + "%) / " + nb_offres_url + "  offres dispo pour l'import sur le site de PE</h1>");
                stream.end();
        
        });
});

module.exports = router;
