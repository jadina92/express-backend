module.exports = function(){
    var db = require('../db/mongo-conn')();
    var Schema = require('mongoose').Schema;
 
    var employes =  Schema({
        nom: String,
        prenom: String,
        status: Boolean
    });

    let Dataset = db.models.employes || db.model('employes', employes);
    return Dataset;
}