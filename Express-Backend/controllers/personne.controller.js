var PersonneModel = require('../models/personne.model');


var PersonneController = function () { }

PersonneController.show = function (req, res, next) {

    PersonneModel.getAllPersons(function (err, result) {

        if (err) {
            throw err;
        } else {
            res.render('forms.ejs', {
                personList: result,
                txtId: '',
                txtNom: '',
                txtPrenom: '',
            });
        }

    });
}

PersonneController.edit = function (req, res) {

    var id = req.params.id;

    PersonneModel.findPersonById(id, function (rows) {

        if(rows==null){
            req.flash('error','Sorry the company doesnot exists!!');
            res.redirect('/person/forms');
        }else{
            res.render('forms.ejs', {
                personList: [],
                txtId: rows[0].id,
                txtNom: rows[0].nom,
                txtPrenom: rows[0].prenom,
            });
        }

    });
}

PersonneController.delete = function (req, res) {

    var id = req.params.id;

    PersonneModel.deletePerson(id, function (err, rows) {

        if (err) {
            req.flash('error', 'There was error in deleting data');
        } else {
            req.flash('success', 'Person deleted succesfully');
        }

        res.redirect('/');

    });
}

PersonneController.save = function (req, res, next) {

    if (req.body.txtId == 0) {

        var data = {
            nom: req.body.txtNom,
            prenom: req.body.txtPrenom
        };

        PersonneModel.savePerson(data, function (err, rows) {

            if (err) {
                req.flash('error', 'There was error in inserting data');
            } else {
                req.flash('success', 'Person added succesfully');
            }

            res.redirect('/');

        });
    }
    else {

        var data = {
            id: req.body.txtId,
            nom: req.body.txtNom,
            prenom: req.body.txtPrenom
        };

        PersonneModel.updatePerson(req.body.txtId, data, function (err, rows) {

            res.redirect('/');
        
        });
    }
}

module.exports = PersonneController;