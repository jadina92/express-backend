const model = require('../models/employes.model')();

var employeController = function () { }

employeController.show = function (req, res, next) {

    model.find({}, (err, result) => {
        if (err) { console.log(err); }

        res.render('employes.ejs', {
            title: 'CRUD MongoDB',
            employes: result,
            txtId: '',
            txtNom: '',
            txtPrenom: '',
        });

    });
}

employeController.edit = function (req, res) {

    let id = req.params.id;
    model.findById(id, (err, result) => {
        if (err) { console.log(err); }
        //result.status=!result.status;
        console.log(result.prenom);
        
        result.save();
        
        res.render('employes.ejs', {
            title: 'CRUD MongoDB',
            employes: [],
            txtId: result.id,
            txtNom: result.nom,
            txtPrenom: result.prenom,
        });
           
        
    });


}

employeController.delete = function (req, res) {

    let id = req.params.id;
    model.deleteOne({ _id: id }, (err, result) => {
        if (err) { console.log(err); }
        res.redirect('/employes/');
    });

}

employeController.save = function (req, res) {

    if (req.body.id == 0) {

        var body = req.body;
        body.status = false;

        model.create(body, (err, result) => {
            if (err) { console.log(err); }
            res.redirect('/employes/');
        });

    }
    else {

        var body = req.body;

        model.updateOne({ _id: body.id }, {
            $set: {
                nom: body.nom,
                prenom :body.prenom
            }
        }, { multi: true }, (error, result) => {
            if (error)
                throw error;
            res.redirect('/employes/');
        });
    }
}

module.exports = employeController;