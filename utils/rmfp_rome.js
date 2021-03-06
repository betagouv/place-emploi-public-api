//selection de métier qui seront envoyés sur le site de pôle emploi.
//un metier (lib_rmfp) absent de ce fichier ne sera jamais envoyé sur pôle emploi
//pour ajouter un métlier, il faut connaitre le libélé RMFP exact, et le code rome (code_ogr) associé
 exports.rmfp_rome = [
    { lib_rmfp: 'SPÉCIALISTE EN INGÉNIERIE D\'ACHAT', code_ogr: '15573' },
    { lib_rmfp: 'RESPONSABLE DU SERVICE DES ACHATS', code_ogr: '12121' },
    { lib_rmfp: 'RESPONSABLE SECTORIEL ACHATS', code_ogr: '10241' },
    { lib_rmfp: 'ACHETEUSE / ACHETEUR IT', code_ogr: '10241' },
    { lib_rmfp: 'ACHETEUSE PUBLIQUE / ACHETEUR PUBLIC', code_ogr: '10241' },
    { lib_rmfp: 'RÉDACTRICE / RÉDACTEUR DE MARCHÉS PUBLICS', code_ogr: '10241' },
    { lib_rmfp: 'GESTIONNAIRE DE MARCHÉS PUBLICS', code_ogr: '10241' },
    { lib_rmfp: 'APPROVISIONNEUSE / APPROVISIONNEUR AUTONOME', code_ogr: '10242' },
    { lib_rmfp: 'RESPONSABLE DE COORDINATION ADMINISTRATIVE', code_ogr: '18739' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DE L\'INSTRUCTION DE DOSSIERS ADMINISTRATIFS', code_ogr: '11943' },
    { lib_rmfp: 'ASSISTANTE / ASSISTANT DE DIRECTION', code_ogr: '11227' },
    { lib_rmfp: 'GESTIONNAIRE DE RESSOURCES DOCUMENTAIRES', code_ogr: '11889' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ D\'ÉTUDES DOCUMENTAIRES', code_ogr: '18892' },
    { lib_rmfp: 'ARCHIVISTE', code_ogr: '14751' },
    { lib_rmfp: 'RESPONSABLE DE LA COMMUNICATION', code_ogr: '18725' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DE COMMUNICATION', code_ogr: '11780' },
    { lib_rmfp: 'ATTACHÉE / ATTACHÉ DE PRESSE', code_ogr: '11397' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DE PRODUCTION ÉVENEMENTIELLE', code_ogr: '38733' },
    { lib_rmfp: 'JOURNALISTE REPORTER D\'IMAGE', code_ogr: '16097' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DE L\'AUDIOVISUEL', code_ogr: '38089' },
    { lib_rmfp: 'RESPONSABLE ÉDITORIAL', code_ogr: '19058' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DE CRÉATION GRAPHIQUE', code_ogr: '15395' },
    { lib_rmfp: 'ANIMATRICE / ANIMATEUR DE RÉSEAUX SOCIAUX ET DE COMMUNAUTÉS NUMÉRIQUES', code_ogr: '38818' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DE PROMOTION ET DE DIFFUSION COMMERCIALE', code_ogr: '18754' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DE MÉCÉNAT ET DES PARTENARIATS', code_ogr: '38908' },
    { lib_rmfp: 'RESPONSABLE BUDGÉTAIRE', code_ogr: '18600' },
    { lib_rmfp: 'CONTRÔLEUSE /CONTRÔLEUR BUDGÉTAIRE EXTERNE', code_ogr: '13586' },
    { lib_rmfp: 'CHARGÉE/CHARGÉ D\'ANALYSES BUDGÉTAIRES', code_ogr: '10949' },
    { lib_rmfp: 'CHARGÉE/CHARGÉ DU PILOTAGE ET DE LA GESTION DES RESSOURCES BUDGÉTAIRES', code_ogr: '13586' },
    { lib_rmfp: 'RESPONSABLE DE CENTRE DE SERVICES PARTAGÉS', code_ogr: '18718' },
    { lib_rmfp: 'CHARGÉE/CHARGÉ DE PRESTATIONS FINANCIÈRES', code_ogr: '11761' },
    { lib_rmfp: 'GESTIONNAIRE D\'ACTIFS', code_ogr: '12787' },
    { lib_rmfp: 'CONTRÔLEUSE/CONTRÔLEUR DE GESTION', code_ogr: '13597' },
    { lib_rmfp: 'CHARGÉE/CHARGÉ DE CONTRÔLE INTERNE BUDGÉTAIRE ET COMPTABLE', code_ogr: '13598' },
    { lib_rmfp: 'EXPERTE/EXPERT EN PROCESSUS FINANCIERS', code_ogr: '13486' },
    { lib_rmfp: 'CHARGÉE/CHARGÉ DE LA TUTELLE FINANCIÈRE DES ORGANISMES PUBLICS ET OPÉRATEURS DE L\'ETAT', code_ogr: '13587' },
    { lib_rmfp: 'RÉGISSEUSE / RÉGISSEUR D\'AVANCES ET/OU DE RECETTES', code_ogr: '18403' },
    { lib_rmfp: 'EXPERTE/EXPERT EN PROCESSUS FINANCIERS', code_ogr: '11761' },
    { lib_rmfp: 'RESPONSABLE DES RESSOURCES HUMAINES', code_ogr: '18942' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DE LA GESTION PRÉVISIONNELLE DES RESSOURCES HUMAINES', code_ogr: '18742' },
    { lib_rmfp: 'CONSEILLÈRE / CONSEILLER MOBILITÉ CARRIÈRE', code_ogr: '13414' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ D\'INGÉNIÉRIE DE FORMATION', code_ogr: '12834' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DE LA PRÉVENTION DES RISQUES PROFESSIONNELS', code_ogr: '38511' },
    { lib_rmfp: 'CHARGÉ DE GESTION ADMINISTRATIVE ET/ OU DE PAIE', code_ogr: '15334' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DU RECRUTEMENT', code_ogr: '11863' },
    { lib_rmfp: 'GESTIONNAIRE - COORDINATRICE / GESTIONNAIRE-COORDINATEUR DE DISPOSITIFS D\'ACTION SOCIALE', code_ogr: '18733' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DU DIALOGUE SOCIAL', code_ogr: '18939' },
    { lib_rmfp: 'CHARGÉ DE GESTION ADMINISTRATIVE ET/ OU DE PAIE', code_ogr: '15369' },
    { lib_rmfp: 'COACH INTERNE', code_ogr: '12675' },
    { lib_rmfp: 'CONSEILLÈRE / CONSEILLER EN ORGANISATION DU TRAVAIL ET CONDUITE DU CHANGEMENT', code_ogr: '13443' },
    { lib_rmfp: 'RESPONSABLE DES AFFAIRES JURIDIQUES', code_ogr: '18864' },
    { lib_rmfp: 'CONSULTANTE / CONSULTANT JURIDIQUE', code_ogr: '16114' },
    { lib_rmfp: 'RÉDACTRICE/ RÉDACTEUR JURIDIQUE', code_ogr: '16114' },
    { lib_rmfp: 'MÉDIATRICE / MÉDIATEUR', code_ogr: '10524' },
    { lib_rmfp: 'RESPONSABLE DE LA LOGISTIQUE', code_ogr: '19112' },
    { lib_rmfp: 'GESTIONNAIRE LOGISTIQUE', code_ogr: '16211' },
    { lib_rmfp: 'CUISINIÈRE / CUISINIER', code_ogr: '13861' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DE PRESTATION HÔTELLIÈRE', code_ogr: '14780' },
    { lib_rmfp: 'CONDUCTRICE / CONDUCTEUR D\'ENGINS LOURDS, SPÉCIAUX OU DE SÉCURITÉ', code_ogr: '11996' },
    { lib_rmfp: 'CONDUCTRICE / CONDUCTEURS D\'ENGINS NAUTIQUES', code_ogr: '17778' },
    { lib_rmfp: 'PILOTE D\'AÉRONEFS TECHNIQUESSURVEILLANCE, DE CONTRÔLE OU DE TRANSPORT', code_ogr: '17742' },
    { lib_rmfp: 'PILOTE DE DRONE', code_ogr: '17742' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DU CONTRÔLE DE TRANSPORT MULTI-MODAL', code_ogr: '18986' },
    { lib_rmfp: 'IMPRIMEUSE / IMPRIMEUR – REPROGRAPHE', code_ogr: '15519' },
    { lib_rmfp: 'RESPONSABLE DU PATRIMOINE DE LA VOIRIE ET DES RÉSEAUX DIVERS', code_ogr: '17499' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ D\'ENTRETIEN DES LOCAUX', code_ogr: '17477' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ DE COUTURE, LINGERIE - BLANCHISSERIE', code_ogr: '17345' },
    { lib_rmfp: 'OPÉRATRICE / OPÉRATEUR EN PYROTECHNIE', code_ogr: '18257' },
    { lib_rmfp: 'OPÉRATRICE / OPÉRATEUR DE MAINTIEN EN CONDITION OPÉRATIONNELLE', code_ogr: '19827' },
    { lib_rmfp: 'EXPERTE/EXPERT EN QUALITE DES PRODUITS, MATERIELS ET EQUIPEMENTS', code_ogr: '19161' },
    { lib_rmfp: 'RESPONSABLE RÉSEAUX ET TÉLÉCOMS', code_ogr: '18948' },
    { lib_rmfp: 'SPÉCIALISTE OUTILS, SYSTÈMES D\'EXPLOITATION, RÉSEAUX ET TÉLÉCOMS', code_ogr: '14963' },
    { lib_rmfp: 'SPÉCIALISTE MÉTHODE ET OUTILS / QUALITÉ / SÉCURITÉ', code_ogr: '14951' },
    { lib_rmfp: 'URBANISTE DES SYSTÈMES D\'INFORMATION', code_ogr: '20493' },
    { lib_rmfp: 'ARCHITECTE TECHNIQUE', code_ogr: '11130' },
    { lib_rmfp: 'RESPONSABLE DU SYSTÈME D\'INFORMATION « MÉTIER »', code_ogr: '18706' },
    { lib_rmfp: 'GESTIONNAIRE DES SYSTÈMES APPLICATIFS', code_ogr: '15321' },
    { lib_rmfp: 'CHEFFE / CHEF DE PROJET MAITRISE D\'OUVRAGE SI', code_ogr: '12252' },
    { lib_rmfp: 'CHEFFE / CHEF DE PROJET MAITRISE D\'ŒUVRE SI', code_ogr: '12250' },
    { lib_rmfp: 'DIRECTRICE / DIRECTEUR DES DONNÉES', code_ogr: '38975' },
    { lib_rmfp: 'DATA SCIENTIST', code_ogr: '38975' },
    { lib_rmfp: 'DÉVELOPPEUSE / DÉVELOPPEUR', code_ogr: '12814' },
    { lib_rmfp: 'INTÉGRATRICE / INTÉGRATEUR D\'EXPLOITATION', code_ogr: '16027' },
    { lib_rmfp: 'RESPONSABLE D\'EXPLOITATION', code_ogr: '19156' },
    { lib_rmfp: 'ADMINISTRATRICE / ADMINISTRATEUR D\'OUTILS, DE SYSTÈMES, DE RÉSEAUX ET/OU DE TÉLÉCOMS', code_ogr: '10316' },
    { lib_rmfp: 'TECHNICIENNE / TECHNICIEN D\'EXPLOITATION ET MAINTENANCE 1ER NIVEAU', code_ogr: '10715' },
    { lib_rmfp: 'TECHNICIENNE / TECHNICIEN SUPPORT UTILISATEURS', code_ogr: '11194' },
    { lib_rmfp: 'RESPONSABLE SÉCURITÉ DES SYSTÈMES D\'INFORMATION - RSSI', code_ogr: '19178' },
    { lib_rmfp: 'PILOTE EN DÉTECTION D\'INTRUSION', code_ogr: '38834' },
    { lib_rmfp: 'CHARGÉE / CHARGÉ D\'ACCUEIL ET DE SERVICE À L\'USAGER', code_ogr: '18753' }
];

