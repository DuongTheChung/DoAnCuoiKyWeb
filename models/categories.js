var db=require('../config/DBConnection');


//Categoty
var Category={

    getAllCategory : function(callback) {
        return db.query("select * from category ",callback);
    },
    getAllCategoryPaging : function(category,callback) {
        return db.query("select * from category order by display_order Limit ?,?",[category.offset,category.limit],callback);
    },

    categoryCount : function(callback) {
       return db.query("select count(1) as count from category", callback);
    },

    getCategoryById:function(id,callback){
        return db.query("select * from category where id=?",[id],callback);
    },

    findCategoryByName:function(name,callback){
        return db.query("select* from category where name=?",[name],callback);
    },

    findCategoryByMetatitle:function(meta_title,id,callback){
        return db.query("select * from category where meta_title=? and id != ?",[meta_title,id],callback);
    },

    addCategory:function(category,callback){
        return db.query("Insert into category(name,meta_title,display_order,"
            +"created_date,created_by) values(?,?,?,?,?)",
        [category.name,category.meta_title,category.display_order
        ,category.created_date,category.created_by],callback);
    },

    deleteCategory:function(id,callback){
        return db.query("delete from category where id=?",[id],callback);
    },

    updateCategory:function(id,category,callback){
        return db.query("update category set name=?,meta_title=?,"
        +"display_order=?,modified_date=?,modified_by=? where id=?",
        [category.name,category.meta_title,category.display_order,category.modified_date,
         category.modified_by,id],callback);
    }
}

module.exports=Category;