const sql = require('../db/db');

var PersonneModel={}

PersonneModel.getAllPersons = function(result){
    sql.query("SELECT * FROM personne",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}

PersonneModel.savePerson = function(newPerson, result){
    
    sql.query("INSERT INTO personne SET ?",newPerson ,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

PersonneModel.updatePerson = function(id, data, result){
    
    sql.query("UPDATE personne SET ? WHERE id = " + id, data,function(err,res){
        if(err)
        result(err); 
   
    return result(res);
    });
   
}

PersonneModel.findPersonById = function(id, result){
    sql.query("SELECT * FROM personne WHERE id = " + id, function(err,rows){
        if(err)
            throw err;
      
        if (rows.length <= 0) {
            return result(err);
        }
        else { 
            return result(rows);
        }   
    })

}

PersonneModel.deletePerson = function(id, result){
    sql.query("DELETE FROM personne WHERE id = " + id,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

module.exports = PersonneModel;