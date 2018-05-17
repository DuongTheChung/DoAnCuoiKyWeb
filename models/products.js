var db=require('../config/DBConnection');


//Categoty
var Product={

    getLimitProduct: function(callback){
        return db.query("select * from product order by created_date DESC Limit 10  ",callback);
    },

    getProductTopView: function(callback){
        return db.query("select * from product order by view_count DESC Limit 10  ",callback);
    },

    getProductSameCategoryLimit:function(categoryName,productName,callback){
        return db.query("select * from product where parent_category=? and name <> ? order by display_order Limit 5",[categoryName,productName],callback);
    },

    getProductSameCompanyLimit:function(companyName,productName,callback){
        return db.query("select * from product where parent_company=? and name <> ? order by display_order Limit 5",[companyName,productName],callback);
    },

    getProductSalesBest: function(callback){
        return db.query("select * from product order by sales_count DESC Limit 10  ",callback);
    },


    getAllProduct: function(callback) {
        return db.query("select * from product",callback);
    },

    getAllProductByCategory:function(parent_category,product,callback){
        return db.query("select * from product where parent_category=? order by display_order Limit ?,?",[parent_category,product.offset,product.limit],callback);
    },

    getAllProductByCompany:function(parent_company,product,callback){
        return db.query("select * from product where parent_company=? order by display_order Limit ?,?",[parent_company,product.offset,product.limit],callback);
    },


    getAllProductPaging: function(product,callback) {
        return db.query("select * from product order by display_order Limit ?,?",[product.offset,product.limit],callback);
    },

    productCount : function(callback) {
       return db.query("select count(1) as count from product", callback);
    },

    productCountByCategory: function(parent_category,callback){
        return db.query("select count(1) as count from product where parent_category=?",[parent_category], callback);
    },

    
    productCountByCompany: function(parent_company,callback){
        return db.query("select count(1) as count from product where parent_company=?",[parent_company], callback);
    },


    getProductById:function(id,callback){
        return db.query("select * from product where id=?",[id],callback);
    },

    findProductByName:function(name,callback){
        return db.query("select* from product where name=?",[name],callback);
    },

    findProductByMetatitle:function(meta_title,callback){
        return db.query("select* from product where meta_title=?",[meta_title],callback);
    },

    findProductByMetatitleOtherId:function(meta_title,id,callback){
        return db.query("select * from product where meta_title=? and id != ?",[meta_title,id],callback);
    },

    addProduct:function(product,callback){
        return db.query("Insert into "+
        "product(name,meta_title,parent_category,parent_company,display_order,description,price,"
            +"image,quantity,created_by,created_date) values(?,?,?,?,?,?,?,?,?,?,?)",
        [   product.name,product.meta_title,product.parent_category,product.parent_company,
            product.display_order,product.description,product.price,
            product.image,product.quantity,product.created_by,product.created_date
        ],callback);
    },

    deleteProduct:function(id,callback){
        return db.query("delete from product where id=?",[id],callback);
    },

    updateProduct:function(id,product,callback){
        return db.query("update product set "
        +"name=?,meta_title=?,parent_category=?,parent_company=?,display_order=?,"
        +"description=?,price=?,image=?,quantity=?,modified_by=?,modified_date=? where id=?",
        [   product.name,product.meta_title,product.parent_category,product.parent_company,
            product.display_order,product.description,product.price,product.image,
            product.quantity,product.modified_by,product.modified_date
        ,id],callback);
    },

    updateViewCountProduct:function(id,count,callback){
        return db.query("update product set "
        +"view_count=? where id=?",
        [count,id],callback);
    }
}

module.exports=Product;