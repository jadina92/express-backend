const express = require('express');
const router = express.Router();
const { check } = require('express-validator')

var employeController = require('../controllers/employe.controller');

var employeRestController = require('../controllers/employe.restcontroller');

// CRUD 

router.get('/', employeController.show);

router.post('/add', employeController.save);

router.get('/select/:id', employeController.edit);

router.get('/delete/:id', employeController.delete);

// REST API

router.get('/search', employeRestController.show);
// Utilisation de la librairie express-validator

// Check() mise en place de validations sur le nom et le prenom
// interdiction de rentrer un nom et un prenom < à 5 caractères
// N'autorisera pas l'insert si les conditions de validations ne sont pas remplies
// Affichage dans la reponse des erreurs a partir de employe.restcontroller
router.post('/addEmploye', [
    check('nom').isLength({ min: 5 }),
    check('prenom').isLength({ min: 5 }),
    ], employeRestController.save);
  

// Check() mise en place de validations sur le nom et le prenom
// interdiction de rentrer un nom et un prenom < à 5 caractères
// N'autorisera pas l'update si les conditions de validations ne sont pas remplies
// Affichage dans la reponse des erreurs a partir de employe.restcontroller 
router.put('/updateEmploye/:id', [
    check('nom').isLength({ min: 5 }),
    check('prenom').isLength({ min: 5 }),
    ], employeRestController.update);

router.get('/selectEmploye/:id', employeRestController.edit);

router.delete('/deleteEmploye/:id', employeRestController.delete);

module.exports = router;