const { response } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const handleErrors = require('./middleware/handleErrors');
var session = require('express-session');
var flash = require('connect-flash');

//var MongoClient = require('mongodb').MongoClient;
var app = express();

// Appel du module router person.js
var person = require('./routes/person');
// Appel du module router post.js
var post = require('./routes/post');
// Appel du module router person.js
var employes = require('./routes/employes');

app.use(cors());
app.use(bodyParser.json());
// Utilise Body-Parser, pour pouvoir lire les entrées d'un formulaire
// le stocke comme un obj Javascript
// accessible via req.body
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Déclaration de vues Embedded Javascript (EJS)
app.set('engine_view', 'ejs');

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
});

// Utilisation de la fonction middleware de gestion des erreurs par défaut
app.use(handleErrors);

// MongoDB est une base de données NoSQL orientée document utilisée 
// pour le stockage de données à haut volume.
// Ce type de SGBD utilise des schémas dynamiques qui signifient que vous pouvez 
// créer des enregistrements sans d'abord définir la structure, comme les champs ou les types et leurs valeurs. 
// MongoDB vous permet de modifier la structure des enregistrements, que nous appelons documents 
// en ajoutant de nouveaux champs ou en supprimant ceux existants.

// MongoDB vs MySQL

// MongoDB représente les données comme des documents JSON tandis que 
// MySQL représente les données dans des tables et des lignes.

// Dans MongoDB, vous n'avez pas besoin de définir le schéma 
// tandis que dans MySQL, vous devez définir vos tables et colonnes

// MongoDB ne prend pas en charge JOIN a la difference de MySQL.

// MongoDB utilise JavaScript comme langage de requête tandis que MySQL utilise le langage de requête structuré (SQL).

// MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (
//   err, client) => {

//   if (err) throw err;
//   var db = client.db('TestDb');
//   var employes = db.collection('employes');

//   app.get('/', (req, res) => {

//     employes.find().toArray(function (err, result) {
//       if (err) {
//         throw err;
//       }
//       res.render('employes.ejs', {
//         title: 'CRUD MongoDB',
//         employes: result,
//         txtId: '',
//         txtNom: '',
//         txtPrenom: '',
//       });
//     });
//   });
//   // Insertion
//   app.post('/employes/add', (req, res) => {
//     let body = req.body;
//     employes.insertOne(body, (error, result) => {

//       if (error) throw err;
//       res.redirect('/employes/');

//     });
//   });

//   employes.insertMany([{nom: 'Wick', prenom: 'John'}, {nom: 'Pot', prenom: 'Pat'}], (error, res) => {

//       if (error) throw err;
//       console.log(res.result.n);
//       console.log(res.ops.length);
//       console.log(res.result.n + ' inserés ave succés !');

//   });


//           // employes.updateOne({ prenom: 'John' }, {
//           //     $set: {
//           //         nom:
//           //             'fdssdf'
//           //     }
//           // }, { multi: true }, (error, result) => {
//           //     if (error)
//           //         throw error;
//           //     if (result.result.nModified > 0)
//           //         console.log('au moins ' + result.result.nModified + ' documents modifies');
//           // });

//           employes.deleteMany({ nom: 'Travolta' }, (error, result) => {
//               if (error)
//                   throw error;
//               if (result.result.n > 0)
//                   console.log(result.result.n + "documents supprimes");
//               else
//                   console.log('aucun element correspondant aux criteres choisis');
//           });

//           // employes.findOneAndUpdate({ nom : ''  }, { $set: {
//           //     nom : 
//           // }});

// });
  

// let comments = [];

// app.get('/comments', (req, res) => {
//     res.render('comment.ejs', {
//         comments
//     });
// });

// app.post('/', (req, res) => {
//     let comment = {
//         title: req.body.title,
//         comment: req.body.comment,
//         date: new Date(Date.now())
//     };
//     comments.push(comment);
//     res.render('comment.ejs', {
//         comments
//     });
// });

// Appel des routes déclarées dans person,js à partir de la route /person
// ...
// http://localhost:8080/person
// http://localhost:8080/person/add
// http://localhost:8080/person/edit
// http://localhost:8080/person/delete
// http://localhost:8080/person/search
app.use('/', person);

// http://localhost:8080/post
// http://localhost:8080/post/1 
app.use('/post', post);

// MongoDB CRUD
app.use('/employes', employes);

// Un Middleware est essentiellement une fontion qui recevra les object Request et Response
// et Comme 3eme argument, une autre fonction next() que l'on appelera une fois notre code middleware terminé 

// var middleWare = function (req, res, next) {
//     console.log("middleWare:", req.url);
//     next();
// };

// var middleWare2 = function (req, res, next) {
//     console.log("middleWare2:", req.url);
// };

// app.get('/', (req, res, next) => {
//     console.log("requete recu");
//     res.send('hello world');
//     next();
// }, middleWare, middleWare2
// );

// var myLogger = function (req, res, next) {
//     console.log("Vous êtes connecté");
//     next();
// }

// var requestTime = function(req, res, next) {
//     req.requestTime = new Date(Date.now());
//     next();
// }

// app.use(myLogger);
// app.use(requestTime);

// app.get('/', (req, res) => {
//     var responseText = 'hello world';
//     responseText += ' appelé à :' + req.requestTime + '';
//     res.send(responseText);
// });



var server = {
  port: 8080
};

app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`));

// app.listen(8080, function () {
//     console.log("Express en attente");
// });