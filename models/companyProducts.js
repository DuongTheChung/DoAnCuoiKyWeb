var db=require('../config/DBConnection');


//Su dung Promise

exports.getAllCompanyProduct = () => {
	var sql = `select * from company`;
	return db.load(sql);
}

exports.getAllCompanyProductPaging = (offset,limit) => {
	var sql = `select * from company order by display_order Limit ${offset},${limit}`;
	return db.load(sql);
}

exports.companyCount = (offset,limit) => {
	var sql = `select count(1) as count from company`;
	return db.load(sql);
}


exports.getCompanyProductById = (id) => {
	var sql = `select * from company where id=${id}`;
	return db.load(sql);
}

exports.findCompanyProductByName = (name) => {
	var sql = `select* from company where name='${name}'`;
	return db.load(sql);
}


exports.findCompanyProductByMetatitle = (meta_title) => {
	var sql = `select * from company where meta_title='${meta_title}'`;
	return db.load(sql);
}

exports.findCompanyProductByMetatitleOtherId = (id,meta_title) => {
	var sql = `select * from company where meta_title='${meta_title}' and id != ${id}`;
	return db.load(sql);
}

exports.addCompanyProduct = (company) => {
    var sql = `Insert into company(name,meta_title,display_order,email,phone,created_date,created_by) `
    +`values('${company.name}','${company.meta_title}',${company.display_order},'${company.email}','${company.phone}','${company.created_date}','${company.created_by}')`;
	return db.save(sql);
}

exports.deleteCompanyProduct = (id) => {
	var sql = `delete from company where id=${id}`;
	return db.save(sql);
}

exports.updateCompanyProduct = (id,company) => {
	var sql = `update company set name='${company.name}',meta_title='${company.meta_title}',`
    +`display_order=${company.display_order},email='${company.email}',phone='${company.phone}',`
    +`modified_date='${company.modified_date}',modified_by='${company.modified_by}' where id=${id}`;
	return db.save(sql);
}


//Su dung callback
//Company product
/*
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

    findCompanyProductByMetatitle:function(meta_title,callback){
        return db.query("select * from company where meta_title=?",[meta_title],callback);
    },

    findCompanyProductByMetatitleOtherId:function(meta_title,id,callback){
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
*/