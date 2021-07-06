# place-emploi-public-api

Un micro-service permettant d'interagir avec le site place-emploi-public.gouv.fr

Étape 1 : récupération quotidienne des offres sur le site place-emploi-public.gouv.fr (via un serveur SFTP)

Etape 2 : conversion quotidienne des offres dans le format "pôle emploi" 

Etape 3 : envoi quotidien des offres sur le portail pôle emploi

Pour suivre le traitement coté pôle emploi, il faut se connecter sur un portail dédié.
Celui-ci prend 24h. 

## Installer le micro-service en local

````
git clone git@github.com:betagouv/place-emploi-public-api.git
npm
npm start
````

Le site est accessible à l'adresse : `http://localhost:3000/`

## Ajouter de nouveau métier à traiter et à envoyer

Seul les offres d'emploi listées dans le fichier [rime_rome.js](routes/utils/rime_rome.js) sont envoyées à pôle emploi.

Un metier (lib_rmfp) absent de ce fichier ne sera jamais envoyé sur pôle emploi. Pour ajouter un métlier, il faut connaitre le libélé rime exact, et le code rome (code_ogr) associé.
  

