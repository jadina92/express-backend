const model = require('../models/employes.model')();
const { BadRequest, NotFound } = require('../utils/errors');
const { validationResult } = require('express-validator')

var employeRestController = function () { }

employeRestController.show = function (req, res, next) {
    // L'instruction try...catch regroupe des instructions à exécuter et 
    // définit une réponse si l'une de ces instructions provoque une exception(erreur).
    // Dans le bloc try Les instructions qu'on souhaite exécuter.
    try {
        model.find({}, (err, result) => {
            if (err) { console.log(err); }

            res.json({
                status: 200,
                result,
                message: "employe list retrieved successfully"
            })

        });
        // Les instructions à exécuter si une exception(erreur) est levée dans le bloc try
    } catch (err) {
        next(err)
    }

}

employeRestController.edit = function (req, res) {

    let id = req.params.id;

    // L'instruction try...catch regroupe des instructions à exécuter et 
    // définit une réponse si l'une de ces instructions provoque une exception(erreur).
    // Dans le bloc try Les instructions qu'on souhaite exécuter.
    try {
        if (!id) {
            throw new BadRequest('Missing required fields: id');
        }
        model.findById(id, (err, result) => {

            if (err) {
                console.log(err);
            }
            // affiche en console une erreur
            // si l'utilisateur rentre un id qui n'exsite pas dans la bd   
            if (result == null) {
                throw new NotFound('Bad Values: ' + id + ' Insert a correct value');
            }

            //result.save();
            res.json({
                result,
                status: 200,
                message: "employe selected successfully"
            })


        });
        // Les instructions à exécuter si une exception(erreur) est levée dans le bloc try
    } catch (err) {
        next(err)
    }

}

employeRestController.delete = function (req, res) {

    let id = req.params.id;

    // L'instruction try...catch regroupe des instructions à exécuter et 
    // définit une réponse si l'une de ces instructions provoque une exception(erreur).
    // Dans le bloc try Les instructions qu'on souhaite exécuter.
    try {
        if (!id) {
            throw new BadRequest('Missing required fields: id');
        }
        model.deleteOne({ _id: id }, (err, result) => {
            if (err) {
                console.log(err);
            }
            // affiche en console une erreur
            // si l'utilisateur rentre un id qui n'exsite pas dans la bd   
            else if (result == null) {
                throw new NotFound('Bad Values: ' + id + 'Insert a correct value');
            }
            else {
                res.json({
                    status: 200,
                    message: "employe deleted successfully"
                })
            }
        });
        // Les instructions à exécuter si une exception(erreur) est levée dans le bloc try
    } catch (err) {
        next(err)
    }
}
employeRestController.update = function (req, res) {

    const errors = validationResult(req)
    let id = req.params.id;
    var body = req.body;

    // L'instruction try...catch regroupe des instructions à exécuter et 
    // définit une réponse si l'une de ces instructions provoque une exception(erreur).
    // Dans le bloc try Les instructions qu'on souhaite exécuter.
    try {
        // Affiche les erreurs de validations sur les champs de l objet Json
        // nom et prenom ne doivent pas etre < a 5 caractères
        // sinon affichage de l erreur et pas de mise à jour
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        model.updateOne({ _id: id }, {
            $set: {
                nom: body.nom,
                prenom: body.prenom
            }
        }, { multi: true }, (error, result) => {

            if (error) {
                console.log(err);
            }
            // affiche en console une erreur
            // si l'utilisateur rentre un id qui n'exsite pas dans la bd    
            else if (result == null) {
                throw new NotFound('Bad Values: ' + id + 'Insert a correct value');
            }
            else {
                res.json({
                    status: 200,
                    message: "employe updated successfully"
                })
            }
        });

        // Les instructions à exécuter si une exception(erreur) est levée dans le bloc try
    } catch (err) {
        next(err)
    }
}

employeRestController.save = function (req, res, next) {

    const errors = validationResult(req)
    var body = req.body;
    body.status = false;

    // L'instruction try...catch regroupe des instructions à exécuter et 
    // définit une réponse si l'une de ces instructions provoque une exception(erreur).
    // Dans le bloc try Les instructions qu'on souhaite exécuter.
    try {
        // Affiche les erreurs de validations sur les champs de l objet Json
        // nom et prenom ne doivent pas etre < a 5 caractères
        // sinon affichage de l erreur et pas d'insertion'
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        model.create(body, (err, result) => {
            if (err) { console.log(err); }
            res.json({
                status: 200,
                message: "New employe added successfully"
            })
        });
        // Les instructions à exécuter si une exception(erreur) est levée dans le bloc try
    } catch (err) {
        next(err)
    }
}

module.exports = employeRestController;