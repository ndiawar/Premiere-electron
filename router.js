/* Appel de tous nos outils */
const express = require('express');
const expressApp = express();
const http = require('http').Server(expressApp);
const path = require('path');
/* Ajout de express-ejs-layouts */
const ejsLayout = require('express-ejs-layouts');
/* Initialisation des variables */
const router = {
    isStarted: false
};
function start(callback) {
    if (router.isStarted === false) {
        init(function () {
            loadRoutes(function () {
                /* Lance le serveur web sur le port 3000 */
                http.listen(3000, function () {
                    console.log('Application is running on port 3000');
                    router.isStarted = true;
                    if (typeof callback != 'undefined') {
                        callback();
                    }
                });
            });
        });
    } else {
        console.log("Application already started");
        if (typeof callback != 'undefined') {
            callback();
        }
    }
}
function init(callback) {
    /* On s'assure que le serveur n'est vraiment pas démarré */
    router.isStarted = false;
    /* Ajout de express-ejs-layouts */
    expressApp.use(ejsLayout);
    /* J'utilise ici EJS comme moteur de template */
    expressApp.set('view engine', 'ejs');
    /* assets sera le répertoire où se trouverons nos fichiers côté client */
    expressApp.use(express.static(path.join(__dirname, 'assets')));
    /* views est défini comme notre dossier de vues par défaut */
    expressApp.set('views', path.join(__dirname, '/views/'));
    if (typeof callback != 'undefined') {
        callback();
    }
}
/* ROUTES */
function loadRoutes(callback) {
    expressApp.get('/', function (req, res) {
        res.render('homepage/home');
    });
    if (typeof callback != 'undefined') {
        callback();
    }
}
module.exports = {
    start: start
};