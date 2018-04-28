var db=require('../config/DBConnection');

var Category={

    getAllCategory:function(callback){
        return db.query("select * from category",callback);
    },

    getCategoryById:function(id,callback){
        return db.query("select * from category where id=?",[id],callback);
    },

    addCategory:function(category,callback){
        return db.query("Insert into category(name) values(?)",[category.name],callback);
    },

    deleteCategory:function(id,callback){
        return db.query("delete from category where id=?",[id],callback);
    },

    updateCategory:function(id,category,callback){
        return db.query("update category set nam=? where id=?",[category.name,id],callback);
    }
}

module.exports=Category;