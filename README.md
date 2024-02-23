# beeper-starter-2024

Pour commencer :

 - Run `npm install` pour installer toutes les dépendances listées dans le `package.json`
 - Mettre un `.env` avec toutes les bonnes variables pour se connecter à la base de données et à Auth0 (demander à un camarade pour un modèle de `.env`)
 - Lancer le serveur avec `node server.js` (ou `npx nodemon server.js` pour qu'il redémarre automatiquement quand un fichier change)

# Travail effectué
## Mentions

Ajout de la possibilité de faire des mentions dans le corps du tweet avec le symbole @.
La mention, si elle est valable (si le nom d'utilisateur mentionné existe dans la base de données)
possède un hyperlien vers le profil de l'utilisateur mentionné.

## Interface utilisateur

Les interfaces ont été gérées avec Bootstrap.

Ajout d'une barre de navigation:
- Le bouton "Twittor" renvoie vers home.
- Cliquer sur la photo de profil renvoie vers le profil de l'utilisateur connecté.
- Le bouton "Log out" renvoie vers la page de déconnexion.
- La barre de recherche n'est pas fonctionnelle.

Affinage de l'apparence de l'encadré de post de Tweet.

Affinage de l'apparence des tweets, le nom de l'auteur renvoie vers sa page.

Affinage de l'apparence des pages de profils.

