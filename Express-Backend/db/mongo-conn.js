const mongoose = require('mongoose');

let db;

module.exports = function connection(){
    if(!db){
        db = mongoose.createConnection('mongodb://localhost/TestDb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    return db;
}