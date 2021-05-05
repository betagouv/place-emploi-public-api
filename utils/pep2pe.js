var express = require('express');
var router = express.Router();
//var FormData = require('form-data');
const csv = require('csv-parser');
//var axios = require('axios');
const fs = require('fs');
var accents = require('remove-accents');
let export_rime_rome = require('./rime_rome.js');
var now = new Date();


module.exports = {
//pep2pe prend en entré un fichier d'export d'offre de pep au format talentsoft
//ensuite, on ne prend que les offres qui sont dans le référentiel rime_rome (/rime_rome.js)
//on supprimer les offres qui on un descriptif trop court, etc
//ensuite il le converti dans un format "pole emploi"
  pep2pe : function(pepfile, pefile,callback){

    var offresPEP = [];
    var nb_offres_export = 0;
    var nb_offres_url = 0;
    var tmp_date = Date.now();
    //var stream = fs.createWriteStream(__dirname + '/../public/offres/' + tmp_date + '-export-pep2pe.csv');
    var stream = fs.createWriteStream(__dirname + '/../public/offres/last-export-to-pe.csv');
    stream.on('error', function (err) {
        console.log(err);
        //res.status(500);
        return err;
    });

    stream.once('open', (fd) => {
        stream.write("Par_URL_offre|Code_OGR|Par_ref_offre|Description|Libelle_metier_OGR|DEP_libelle|DEP_cle|Description_entreprise|Par_cle|Par_nom|Off_experience_duree_min|Exp_cle|Exp_libelle|Dur_cle_experience|NTC_cle|TCO_cle|Off_contrat_duree_MO|Pay_cle|Off_date_creation|Off_date_modification\n");
    });
    //fichier test = export_offres_PE_test.csv
    var talentsoft_export_file = '';
    if (pepfile) {
        talentsoft_export_file = pepfile;
    }
    else {
        talentsoft_export_file = 'last-import-from-ts-pep.csv'; //'export_offres_PEP_07avril2021.csv'
    }
    //console.log('[pep2pe] : import du fichier :'+talentsoft_export_file);
    fs.createReadStream(__dirname + '/../public/offres/' + talentsoft_export_file)
        .on('error', function (err) {
            //res.status(500);
            if(callback) callback(err);
            return err;
        })
        .pipe(csv({ 'separator': ';' ,'escape' : '"'}))
        .on('headers', (headers) => {
            //console.log(`👉 First header: ${headers[0]}`)
          })
        .on('data', (data) => offresPEP.push(data))
        .on('end', () => {

            //console.log("🔎 Nombres de lignes importées: " + offresPEP.length);
            var i = 0;

            for (i = 0; i < offresPEP.length; i++) {

                /// console.log("Traitement de OfferID = " + offresPEP[i].OfferID); // 527929
                // mise en majuscule du libellé du métier et suppréssion des parenthèses . 
                // Responsable des études et applications (FPT - A7A/08) => RESPONSABLE DES ÉTUDES ET APPLICATIONS

                var Libelle_metier_pep = '';
                if(offresPEP[i].JobDescription_PrimaryProfile_){
                    Libelle_metier_pep = offresPEP[i].JobDescription_PrimaryProfile_.toUpperCase().replace(/ *\([^)]*\) */g, "");}
                ///  console.log('offre pe Par_ref_offre============== 👉');
             //console.log('Libelle_metier_pep = ' + Libelle_metier_pep);

                var tmp_rime_rome_match = export_rime_rome.rime_rome.find(metier => metier.lib_rime == Libelle_metier_pep);
                if (tmp_rime_rome_match) {

                    offresPEP[i].JobDescriptionTranslation_Description1_ = offresPEP[i].JobDescriptionTranslation_Description1_.replace(/(\r\n|\n|\r)/gm, "\\n").replaceAll('|', '');
                    //console.log( "😱"+offresPEP[i].JobDescriptionTranslation_Description1_+" > "+offresPEP[i].JobDescriptionTranslation_Description1_.length );

                    if (offresPEP[i].JobDescriptionTranslation_Description1_.length < 50) {
                         //console.log('❌ ❌ descriptif trop petit');
                        continue;
                    }

                    if (offresPEP[i].JobDescriptionTranslation_Description1_.length > 4800) {
                        //console.log('🪚 on coupe à 4800 caractère le descriptif');
                        offresPEP[i].JobDescriptionTranslation_Description1 = offresPEP[i].JobDescriptionTranslation_Description1.substring(0, 4799);
                    }

                    nb_offres_export++;
                    let dep_nom = '';
                    let dep_num = ''

                    if (offresPEP[i].Location_Department_Department_ != '') {
                        let dep = offresPEP[i].Location_Department_Department_.split("(");
                        dep_nom = dep[0];
                        dep_num = String(dep[1]);
                        dep_num = dep_num.replace(')', '').replace('\'', '');
                    }
                   
                    let config = {
                        ref: offresPEP[i].Offer_Reference_,
                        OfferID: offresPEP[i].Offer_Reference_,
                        Offer_Reference_: offresPEP[i].Offer_Reference_,
                        iteration: i,
                        code_ogr: tmp_rime_rome_match.code_ogr,
                        description: offresPEP[i].JobDescriptionTranslation_Description1_,
                        Description_entreprise :  offresPEP[i].Origin_Entity_                   
                    };
                        //console.log(offresPEP[i]);
                        let experience = 2;
                        let exp_cle = 'E';
                        let exp_libelle = 'Expérience exigée';
                        if(offresPEP[i].ApplicantCriteria_ExperienceLevel_ == 'Débutant') {
                            experience = 0;
                            exp_cle = 'D';
                            exp_libelle = 'Debutant';
                        } 

                    var annee   = now.getFullYear();
                    var mois    =  ("0" + (now.getMonth() + 1)).slice(-2);
                    var jour    = ('0' + now.getDate()).slice(-2) ; 
                    //console.log('jour =>'+jour+'')
                    nb_offres_url++;
                    fs.appendFile(__dirname + '/../public/offres/last-export-to-pe.csv', "https://place-emploi-public.gouv.fr/offre-emploi/"+config.Offer_Reference_ + "|" + config.code_ogr + "|" + config.OfferID + "|" + offresPEP[config.iteration].JobDescriptionTranslation_Description1_ + "|" + offresPEP[config.iteration].JobDescriptionTranslation_JobTitle_.replace(/(\r\n|\n|\r)/gm, '') + "|" + dep_nom + "|" + dep_num + "|"+config.Description_entreprise+"|PEP|PEP|"+experience+"|"+exp_cle+"|"+exp_libelle+"|AN|E1|CDD|36|1|"+jour+"/"+mois+"/"+annee+"|\n", function (err) {
                        if (err) {
                            throw err;
                            if(callback) callback(err);}
                        /// console.log('Saved! ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️');
                    });
                } else {
                    /// console.log("❌ pas de correspondance trouvé entre offre et code ROME :");
                    continue;
                }
            }           
                /// console.log('écriture fichier');
              //  res.send("<h1>" + offresPEP.length + " offres importées depuis PEP / " + nb_offres_export + " avec correspondanc RIME-ROME  (" + Math.round(eval((nb_offres_export * 100) / offresPEP.length)) + "%) / " + nb_offres_url + "  offres dispo pour l'import sur le site de PE</h1>");
              stream.end();
              if(callback) callback( "✅ " + offresPEP.length + " offres importées depuis PEP / " + nb_offres_export + " avec correspondanc RIME-ROME  (" + Math.round(eval((nb_offres_export * 100) / offresPEP.length)) + "%) / " + nb_offres_url + "  offres dispo pour l'import sur le site de PE \r\n");
              return   "" + offresPEP.length + " offres importées depuis PEP / " + nb_offres_export + " avec correspondanc RIME-ROME  (" + Math.round(eval((nb_offres_export * 100) / offresPEP.length)) + "%) / " + nb_offres_url + "  offres dispo pour l'import sur le site de PE";
        });   
}

}