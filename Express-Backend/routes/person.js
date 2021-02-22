var express = require('express');
const db = require('../db/db');
var router = express.Router();
var personneController = require('../controllers/personne.controller');

// Routage : Interception d'une requête client, via la methode HTTP get()
// puis, redirection vers un composant capable de retourner une reponse

// '/' est la route
// router.get('/', (req, res) => {

//     var persons = [
//         { nom: 'Wick', prenom: 'John', age: 40 },
//         { nom: 'Doe', prenom: 'John', age: 50 },
//         { nom: 'Bat', prenom: 'Jean', age: 30 },
//     ];

//     var personTitle = "Liste de personnes";

//     res.render('index.ejs', {
//         personTitle,
//         persons
//     })
// });

// // http://localhost:8080/hello/John
// router.get('/hello/:nom', (req,res) =>{

//     var persons = [
//         {nom : 'Wick', prenom : 'John', age : 40},
//         {nom : 'Doe', prenom : 'John', age : 50},
//         {nom : 'Bat', prenom : 'Jean', age : 30},
//     ];

//     var personTitle = "Liste de personnes";

//     res.render('index.ejs', {
//         personTitle, 
//         persons, 
//         nom : req.params.nom
//     })
//     res.render('index.ejs', { nom : req.params.nom})
// });

// REST API

// app.get('/', function (req, res) {
//     // Intruction qui nous permet de retourner une reponse au client
//     res.send('Get request to the home page');
// });

// app.post('/', function (req, res) {
//     res.send('Post request to the home page');
// });

// // Precision d'une chaine apres notre route '/' = localhost8080/personne
// app.get('/personne', function (req, res) {
//     res.send('Bonjour personne');
// });

router.get('/search', (req, res) => {
    let query = "Select * from personne";

    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/forms');
        }
        res.json({
            status: 200,
            result,
            message: "Person list retrieved successfully"
        })
    });

});

router.post('/add', (req, res) => {

    var data = {
        nom: req.body.nom,
        prenom: req.body.prenom
    };

    db.query("Insert into personne set ? ", data,
        function (err, rows) {
            if (err) throw err;
            console.log("Insertion reussie");
            res.json({
                status: 200,
                message: "New person added successfully"
            })
        });

});

router.put('/update', (req, res) => {

    var data = {
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom
    };

    db.query('UPDATE personne SET ? WHERE id = ' + data.id, data,
        function (err, rows) {
            if (err) throw err;
            console.log("Mise à jour reussie");
            res.json({
                status: 200,
                message: "Person updated successfully"
            })
        });

});

router.get('/select/:id', (req, res) => {

    var id = req.params.id;

    db.query('SELECT * FROM personne WHERE id = "' + id + '"',
        function (err, rows) {
            if (err) throw err;

            res.json({
                rows,
                status: 200,
                message: " person selected successfully"
            })
        });
});

router.delete('/delete/:id', (req, res) => {

    var id = req.params.id;

    db.query('DELETE FROM personne WHERE id = "' + id + '"',
        function (err, rows) {
            if (err) throw err;
            console.log("Suppression reussie");
            res.json({
                status: 200,
                message: " person deleted successfully"
            })
        });
});

// CRUD ejs

// http://localhost:8080/
router.get('/', personneController.show);
// http://localhost:8080/person/deletePersonne/:id
router.get('/deletePersonne/:id', personneController.delete);
// http://localhost:8080/person/ajoutPersonne
router.post('/ajoutPersonne', personneController.save);
// http://localhost:8080/person/editPersonne/:id
router.get('/editPersonne/:id', personneController.edit);

module.exports = router;