var express = require('express');
var router = express.Router();
var FormData = require('form-data');
const csv = require('csv-parser');
var axios = require('axios');
const fs = require('fs')


//ne devrait pas changer a moyen terme. 
const rime_rome = [
    { lib_rime: 'CONSEILLERE/CONSEILLER EN INGENIERIE D\'ACHAT', code_ogr: '15573' },
    { lib_rime: 'RESPONSABLE ACHAT', code_ogr: '12121' },
    { lib_rime: 'ACHETEUSE/ACHETEUR', code_ogr: '10241' },
    { lib_rime: 'REDACTRICE/REDACTEUR DE LA COMMANDE PUBLIQUE', code_ogr: '10241' },
    { lib_rime: 'APPROVISIONNEUSE/APPROVISIONNEUR- ACHATS', code_ogr: '10242' },
    { lib_rime: 'RESPONSABLE DE LA COORDINATION ADMINISTRATIVE', code_ogr: '18739' },
    { lib_rime: 'RESPONSABLE DU BUREAU DU CABINET', code_ogr: '18570' },
    { lib_rime: 'GESTIONNAIRE-INSTRUCTRICE ADMINISTRATIVE/INSTRUCTEUR ADMINISTRATIF', code_ogr: '11943' },
    { lib_rime: 'SECRETAIRE-ASSISTANTE/SECRETAIRE-ASSISTANT', code_ogr: '11227' },
    { lib_rime: 'CHARGEE/CHARGE DE LA GESTION DES RESSOURCES DOCUMENTAIRES', code_ogr: '11889' },
    { lib_rime: 'CHARGEE/CHARGE DE VEILLE INFORMATIONNELLE', code_ogr: '18892' },
    { lib_rime: 'CHARGEE/CHARGE DE LA GESTION DES ARCHIVES', code_ogr: '14751' },
    { lib_rime: 'CHARGEE/CHARGE DE PROMOTION DE SANTE PUBLIQUE OU DE COHESION SOCIALE ', code_ogr: '11813' },
    { lib_rime: 'RESPONSABLE DE COMMUNICATION', code_ogr: '18725' },
    { lib_rime: 'CHARGEE/CHARGE DE COMMUNICATION', code_ogr: '11780' },
    { lib_rime: 'ATTACHEE/ATTACHE DE PRESSE', code_ogr: '11397' },
    { lib_rime: 'CHARGEE/CHARGE DE LA COMMUNICATION EVENEMENTIELLE ET/OU RELATION PUBLIQUES', code_ogr: '38733' },
    { lib_rime: 'CHARGEE/CHARGE DE LA COMMUNICATION EVENEMENTIELLE ET/OU RELATION PUBLIQUES', code_ogr: '16097' },
    { lib_rime: 'CHARGEE/CHARGE DE L\'AUDIO-VISUEL', code_ogr: '38089' },
    { lib_rime: 'RESPONSABLE EDITORIAL MULTI-SUPPORTS', code_ogr: '19058' },
    { lib_rime: 'CHARGEE/CHARGE DE PROJET DE CREATION GRAPHIQUE', code_ogr: '15395' },
    { lib_rime: 'ANIMATRICE/ANIMATEUR DE RESEAUX SOCIAUX', code_ogr: '38818' },
    { lib_rime: 'CHARGEE/CHARGE DE PROMOTION ET DE DIFFUSION COMMERCIALE', code_ogr: '18754' },
    { lib_rime: 'CHARGEE /CHARGE DE MECENAT ET DES PARTENARIATS', code_ogr: '38908' },
    { lib_rime: 'RESPONSABLE BUDGETAIRE', code_ogr: '18600' },
    { lib_rime: 'CONTROLEUSE/CONTROLEUR BUDGETAIRE EXTERNE', code_ogr: '13586' },
    { lib_rime: 'CHARGEE/CHARGE D\'ANALYSE BUDGETAIRE', code_ogr: '10949' },
    { lib_rime: 'CHARGEE/CHARGE DU PILOTAGE ET DE LA GESTION DES RESSOURCES BUDGETAIRES', code_ogr: '13586' },
    { lib_rime: 'RESPONSABLE DE CENTRE DE SERVICES PARTAGES ', code_ogr: '18718' },
    { lib_rime: 'CHARGEE/CHARGE DE PRESTATIONS FINANCIERES', code_ogr: '11761' },
    { lib_rime: 'GESTIONNAIRE D\'ACTIFS', code_ogr: '12787' },
    { lib_rime: 'CONTROLEUSE/CONTROLEUR DE GESTION', code_ogr: '13597' },
    { lib_rime: 'CHARGEE/CHARGE DU CONTROLE INTERNE BUDGETAIRE ET COMPTABLE', code_ogr: '13598' },
    { lib_rime: 'EXPERTE/EXPERT EN INGENIERIE FINANCIERE', code_ogr: '13486' },
    { lib_rime: 'CHARGEE/CHARGE DE LA TUTELLE FINANCIERE DES ORGANISMES PUBLICS ET OPERATEURS DE L\'ETAT', code_ogr: '13587' },
    { lib_rime: 'REGISSEUSE/REGISSEUR D\'AVANCES ET/OU DE RECETTES', code_ogr: '18403' },
    { lib_rime: 'EXPERTE/EXPERT EN PROCESSUS FINANCIERS', code_ogr: '11761' },
    { lib_rime: 'RESPONSABLE DES RESSOURCES HUMAINES', code_ogr: '18942' },
    { lib_rime: 'CHARGEE/CHARGE DE LA GESTION PREVISIONNELLE DES RESSOURCES HUMAINES', code_ogr: '18742' },
    { lib_rime: 'CONSEILLERE/CONSEILLER EN EVOLUTION PROFESSIONNELLE', code_ogr: '13414' },
    { lib_rime: 'CHARGEE/CHARGE D\'INGENIERIE DE FORMATION', code_ogr: '12834' },
    { lib_rime: 'CHARGEE/CHARGE DE LA PREVENTION DES RISQUES PROFESSIONNELS', code_ogr: '38511' },
    { lib_rime: 'GESTIONNAIRE DES RESSOURCES HUMAINES', code_ogr: '15334' },
    { lib_rime: 'CHARGEE/CHARGE DU RECRUTEMENT', code_ogr: '11863' },
    { lib_rime: 'CHARGEE/CHARGE DES DISPOSITIFS SOCIAUX', code_ogr: '18733' },
    { lib_rime: 'CHARGEE/CHARGE DU DIALOGUE SOCIAL', code_ogr: '18939' },
    { lib_rime: 'CHARGEE/CHARGE DE GESTION ADMINISTRATIVE ET DE PAYE', code_ogr: '15369' },
    { lib_rime: 'COACH INTERNE', code_ogr: '12675' },
    { lib_rime: 'CONSEILLERE/CONSEILLER EN ORGANISATION DU TRAVAIL ET CONDUITE DU CHANGEMENT RH', code_ogr: '13443' },
    { lib_rime: 'RESPONSABLE JURIDIQUE', code_ogr: '18864' },
    { lib_rime: 'JURISTE-CONSULTANTE /JURISTE-CONSULTANT', code_ogr: '16114' },
    { lib_rime: 'CHARGEE/CHARGE DE REDACTION JURIDIQUE', code_ogr: '16114' },
    { lib_rime: 'CHARGEE/CHARGE DE MEDIATION et de PREVENTION DES CONFLITS', code_ogr: '10524' },
    { lib_rime: 'RESPONSABLE LOGISTIQUE', code_ogr: '19112' },
    { lib_rime: 'OPERATRICE/OPERATEUR LOGISTIQUE', code_ogr: '16211' },
    { lib_rime: 'APPROVISIONNEUSE/APPROVISIONNEUR- LOGISTIQUE', code_ogr: '11097' },
    { lib_rime: 'CUISINIERE/CUISINIER', code_ogr: '13861' },
    { lib_rime: 'PERSONNEL DE PRESTATION HOTELIERE ET DE SERVICE', code_ogr: '14780' },
    { lib_rime: 'CONDUCTRICE/CONDUCTEUR DE VEHICULES TERRESTRES OU D\'ENGINS SPECIAUX', code_ogr: '11996' },
    { lib_rime: 'NAVIGATRICE/NAVIGATEUR FLUVIAL ET MARITIME', code_ogr: '17778' },
    { lib_rime: 'PILOTE D\'AERONEF DE SURVEILLANCE, DE CONTROLE OU  DE TRANSPORT', code_ogr: '17742' },
    { lib_rime: 'PILOTE DE DRONE', code_ogr: '17742' },
    { lib_rime: 'GESTIONNAIRE DU TRANSPORT ET DE LA REGULATION', code_ogr: '18986' },
    { lib_rime: 'IMPRIMEURE/IMPRIMEUR – REPROGRAPHE', code_ogr: '15519' },
    { lib_rime: 'CHARGEE/CHARGE DE L\'ENTRETIEN DES VOIRIES ET ESPACES VERTS', code_ogr: '17499' },
    { lib_rime: 'OUVRIERE/OUVRIER DE MAINTENANCE DES BATIMENTS', code_ogr: '17477' },
    { lib_rime: 'TECHNICIENNE/TECHNICIEN TEXTILES ET MATERIAUX SOUPLES', code_ogr: '17345' },
    { lib_rime: 'TECHNICIENNE/TECHNICIEN PYROTECHNIE', code_ogr: '18257' },
    { lib_rime: 'TECHNICIENNE/TECHNICIEN DE MAINTIEN EN CONDITIONS OPERATIONNELLES', code_ogr: '19827' },
    { lib_rime: 'EXPERTE/EXPERT EN DOCUMENTATION ET CERTIFICATION DE LA MAINTENANCE', code_ogr: '19827' },
    { lib_rime: 'EXPERTE/EXPERT EN QUALITE DES PRODUITS, MATERIELS ET EQUIPEMENTS', code_ogr: '19161' },
    { lib_rime: 'EXPERTE/EXPERT EN METROLOGIE', code_ogr: '14953' },
    { lib_rime: 'RESPONSABLE DES SYSTEMES ET RESEAUX D\'INFORMATION ET DE COMMUNICATION', code_ogr: '18948' },
    { lib_rime: 'EXPERTE/EXPERT EN NUMERIQUE ET SYSTEMES ET RESEAUX D\'INFORMATION ET DE COMMUNICATION', code_ogr: '14963' },
    { lib_rime: 'CHARGEE/CHARGE DE METHODES, OUTILS ET QUALITE POUR LE NUMERIQUE ET LES SYSTEMES D\'INFORMATION ET DE COMMUNICATION', code_ogr: '14951' },
    { lib_rime: 'URBANISTE DES SYSTEMES D\'INFORMATION ET DE COMMUNICATION', code_ogr: '20493' },
    { lib_rime: 'ARCHITECTE TECHNIQUE', code_ogr: '11130' },
    { lib_rime: 'RESPONSABLE DE DOMAINE METIER', code_ogr: '18706' },
    { lib_rime: 'CHARGEE/CHARGE DE SERVICES APPLICATIFS', code_ogr: '15321' },
    { lib_rime: 'CHEFFE/CHEF DE PROJET MAITRISE D\'OUVRAGE NSIC', code_ogr: '12252' },
    { lib_rime: 'CHEFFE/CHEF DE PROJET MAITRISE D\'ŒUVRE NSIC', code_ogr: '12250' },
    { lib_rime: 'CHARGEE/CHARGE DE GOUVERNANCE DE DONNEES', code_ogr: '38975' },
    { lib_rime: 'DATA SCIENTIST', code_ogr: '38975' },
    { lib_rime: 'CHARGEE/CHARGE DE CONCEPTION ET DEVELOPPEMENT', code_ogr: '12814' },
    { lib_rime: 'INTEGRATRICE/INTEGRATEUR', code_ogr: '16027' },
    { lib_rime: 'PILOTE DE LA PRODUCTION', code_ogr: '19156' },
    { lib_rime: 'ADMINISTRATRICE/ADMINISTRATEUR EN SYSTEMES D\'INFORMATION ET DE COMMUNICATION', code_ogr: '10316' },
    { lib_rime: 'TECHNICIENNE/TECHNICIEN D\'EXPLOITATION', code_ogr: '10715' },
    { lib_rime: 'ASSISTANTE/ASSISTANT SUPPORT AUPRES DES UTILISATEURS', code_ogr: '11194' },
    { lib_rime: 'TECHNICIENNE/TECHNICIEN DE PROXIMITE', code_ogr: '15362' },
    { lib_rime: 'RESPONSABLE DE LA SECURITE NUMERIQUE', code_ogr: '19178' },
    { lib_rime: 'CHARGEE /CHARGE DE CYBERDEFENSE', code_ogr: '38834' },
    { lib_rime: 'RESPONSABLE DE LA RELATION ET DU SERVICE A L\'USAGER', code_ogr: '18753' },
    { lib_rime: 'EXPERTE/EXPERT METIER DE LA RELATION ET DU SERVICE A L\'USAGER', code_ogr: '13877' },
    { lib_rime: 'CHARGEE/ CHARGE DE RELATION ET DE SERVICE A L\'USAGER', code_ogr: '10298' },
    { lib_rime: 'CHARGEE/ CHARGE DE L\'OFFRE DE SERVICE  RELATION A L\'USAGER', code_ogr: '13877' },
    { lib_rime: 'RESPONSABLE DES ÉTUDES ET APPLICATIONS', code_ogr: '12345' }



]

const header = ['OfferID', 'Offer_CreationUser_', 'Offer_CustomFields_Date1_', 'Offer_ModificationDate_', 'Offer_CustomFieldsTranslation_LongText2_',
    'Offer_OfferID_', 'Offer_CustomFieldsTranslation_LongText1_', 'Offer_CoordLat_', 'Offer_CoordLong_', 'Offer_Reference_', 'Offer_OfferStatus_', 'JobDescription_CustomFields_CustomCodeTableValue1_',
    'JobDescription_CustomFieldsTranslation_ShortText2_', 'JobDescription_CustomFieldsTranslation_LongText2_', 'JobDescription_CustomFieldsTranslation_LongText1_',
    'JobDescription_CustomFieldsTranslation_LongText3_', 'JobDescriptionTranslation_Description2_', 'JobDescriptionTranslation_Description1_', 'JobDescription_PrimaryProfile_',
    'JobDescriptionTranslation_ContractLength_', 'JobDescriptionTranslation_JobTitle_', 'JobDescription_Contract_', 'JobDescription_Country_', 'JobDescription_ProfessionalCategory_',
    'JobDescription_SalaryRange_', 'Offer_Profile_Profile_', 'Location_JobLocation_', 'Location_CustomFieldsTranslation_ShortText1_', 'Location_GeographicalArea_GeographicalArea_',
    'Location_Country_Country_', 'Location_Region_Region_', 'Location_Department_Department_', 'ApplicantCriteria_EducationLevel_',
    'ApplicantCriteria_Country_', 'Offer_Specialisation_Specialisation_', 'RequiredLanguage_Language_', 'RequiredLanguage_LanguageLevel_', 'Origin_CustomFieldsTranslation_ShortText3_',
    'Origin_BeginningDate_', 'Origin_Entity_With1', 'Origin_Entity_With2', 'Origin_Entity_With3', 'Origin_Entity_With4', 'Origin_Entity_With5', 'Origin_Entity_', 'Origin_CustomFieldsTranslation_ShortText2_', 'Origin_CustomFieldsTranslation_ShortText1_', 'Offer_BackOfficeUser_User_', 'SchedulingData_DefaultPublicationBeginDate_', 'SchedulingData_DefaultPublicationEndDate_',
    'SchedulingData_UpdateFrequency_', 'SchedulingData_AutomaticUpdate_', 'OfferCustomBlock1_CustomFieldsTranslation_LongText1_', 'OfferCustomBlock1_CustomFields_CustomCodeTableValue3_', 'FirstPublicationDate', 'MainSupervisor']

/* GET url offer on place-emploi-public.gouv.fr with a offer id */
router.get('/', function (req, res, next) {
    var offresPEP = [];
    var offresPE = [];
    var nb_offres_export = 0;
    var nb_offres_url = 0;
    let tmp_offres_pe = [];
    fs.createReadStream(__dirname + '/../public/offres/test-pep2pe.csv')
        .pipe(csv({ 'separator': ';' }))
        .on('data', (data) => offresPEP.push(data))
        .on('end', () => {
        
            console.log("🔎 Nombres de lignes importées: " + offresPEP.length);
            var i = 0;
           
            for ( i = 0; i < offresPEP.length; i++) {

                //console.log(offresPEP[0]);
                console.log("Traitement de OfferID = " + offresPEP[i].OfferID); // 527929
                //res.send(offresPEP[i]);
                //mise en majuscule du libellé du métier et suppréssion des parenthèses . 
                // Responsable des études et applications (FPT - A7A/08) => RESPONSABLE DES ÉTUDES ET APPLICATIONS
                var Libelle_metier_pep = offresPEP[i].JobDescription_PrimaryProfile_.toUpperCase().replace(/ *\([^)]*\) */g, "");
                
      

                console.log('offre pe Par_ref_offre============== 👉');
               


                console.log('Libelle_metier_pep = ' + Libelle_metier_pep);
                var tmp_rime_rome_match = rime_rome.find(metier => metier.lib_rime == Libelle_metier_pep);
                if (tmp_rime_rome_match) {

                    offresPEP[i].JobDescriptionTranslation_Description1_ = offresPEP[i].JobDescriptionTranslation_Description1_.replace(/(?:\r\n|\r|\n)/g, '\\n');
                    console.log( "😱"+offresPEP[i].JobDescriptionTranslation_Description1_+" > "+offresPEP[i].JobDescriptionTranslation_Description1_.length );
                    
                    if(offresPEP[i].JobDescriptionTranslation_Description1_.length < 50) {
                        console.log('❌ ❌ descriptif trop petit');
                        continue;
                    }

                    if(offresPEP[i].JobDescriptionTranslation_Description1_.length > 4800) {
                        console.log('🪚 on coupe a 4800 caractère le descriptif');
                        continue;
                    }
                    
                    var data = new FormData();

                    nb_offres_export++;
                    console.log("✅ correspondance trouvé entre offre et code ROME I="+i); // ex : Libelle_metier_pep = RESPONSABLE ACHAT => { lib_rime: 'RESPONSABLE ACHAT', code_ogr: '12121' }
                    //console.log(tmp_rime_rome_match.code_ogr);    
                    

                    //URL offre = Offer_Reference_ 
                    //console.log('Reference PEP = ' + offresPEP[i].Offer_Reference_);
                    data.append('reference', offresPEP[i].Offer_Reference_);
                    data.append('action', 'get_reference');
                    let config = {
                        method: 'post',
                        url: 'https://place-emploi-public.gouv.fr/wp-admin/admin-ajax.php',
                        headers: {
                            ...data.getHeaders()
                        },
                        ref: offresPEP[i].Offer_Reference_,
                        iteration: i,
                        code_ogr: tmp_rime_rome_match.code_ogr,
                        data: data
                    };
                     axios(config)
                        .then(function (response) {
                            //console.log('reponse data='+response.data);
                            //console.log(response.data);
                            //console.log('reponse data.url ='+response.data.url);
                            if (response.data.message == 'Offre trouvée !') {
                                // On a bien un url sur le front PEP : l'offre est publié et dispo
                                var offre_pep_url = response.data.url;
                                console.log('✅ ✅  URL trouvé'+response.data.url+" I ="+config.iteration+ "et code ogr="+config.code_ogr);
                                console.log(config.iteration);
                                //res.send(response.data.url);
                                var tmp_data_pe = {
                                    'Par_URL_offre': response.data.url,
                                    'Code_ogr': config.code_ogr,
                                    'Par_ref_offre': offresPEP[config.iteration].OfferID,
                                    'Description': offresPEP[config.iteration].JobDescriptionTranslation_Description1_,
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
                                nb_offres_url++


                            } else {
                                console.log('❌ ❌❌ pas d\'URL dans le front PEP pour cette offre');
                                
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            

                        });


                } else {
                    console.log("❌ pas de correspondance trouvé entre offre et code ROME :");
                    //console.log(tmp_rime_rome_match);

                    continue;
                }

            }
          
            Promise.all(tmp_offres_pe).then(() => console.log(tmp_offres_pe));

            res.send("<h1>" + offresPEP.length + " offres importes / " + nb_offres_export + " avec correspondanc RIME-ROME  (" + eval((nb_offres_export * 100) / offresPEP.length) + "%) / "+nb_offres_url+"  en ligne sur le site PEP</h1>");
      
        });


});

module.exports = router;
