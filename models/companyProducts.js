var db=require('../config/DBConnection');

//Company product

var CompanyProducts={

    getAllCompanyProduct : function(callback){
        return db.query("select * from company",callback);
    },
    getAllCompanyProductPaging : function(company,callback) {
        return db.query("select * from company order by display_order Limit ?,?",[company.offset,company.limit],callback);
    },

    companyCount : function(callback) {
       return db.query("select count(1) as count from company", callback);
    },

    getCompanyProductById:function(id,callback){
        return db.query("select * from company where id=?",[id],callback);
    },

    findCompanyProductByName:function(name,callback){
        return db.query("select* from company where name=?",[name],callback);
    },

    findCompanyProductByMetatitle:function(meta_title,id,callback){
        return db.query("select * from company where meta_title=? and id != ?",[meta_title,id],callback);
    },

    addCompanyProduct:function(company,callback){
        return db.query("Insert into company(name,meta_title,display_order,"
            +"email,phone,"
            +"created_date,created_by) values(?,?,?,?,?,?,?)",
        [company.name,company.meta_title,company.display_order,
        company.email,company.phone
        ,company.created_date,company.created_by],callback);
    },

    deleteCompanyProduct:function(id,callback){
        return db.query("delete from company where id=?",[id],callback);
    },

    updateCompanyProduct:function(id,company,callback){
        return db.query("update company set name=?,meta_title=?,"
        +"display_order=?,email=?,phone=?,"
        +"modified_date=?,modified_by=? where id=?",
        [company.name,company.meta_title,company.display_order,
        company.email,company.phone,
        company.modified_date,company.modified_by,id],callback);
    }
}

module.exports=CompanyProducts;
