var db=require('../config/DBConnection');



exports.billProductCount = () => {
	var sql = `select count(1) as count from bill_product`;
	return db.load(sql);
}

exports.getAllBillProductPaging = (offset,limit) => {
    var sql = `select bill_product.id AS id, bill_product.product_name as product_name,bill_product.category_name as category_name,bill_product.company_name as company_name`
    +`,bill_product.quantity as quantity,bill_product.total_price as total_price,bill_product.created_date as created_date,`
    +`bill_product.status as status,user.username as username from bill_product JOIN user where bill_product.userId=user.id order by created_date DESC  Limit ${offset},${limit}`;
	return db.load(sql);
}


//su dung promise
exports.addBillProduct = (billProduct) => {
	var sql = `Insert into bill_product(userId,product_name,category_name,company_name,quantity,total_price,`
    +`created_date) values(${billProduct.userId},'${billProduct.product_name}','${billProduct.category_name}','${billProduct.company_name}',${billProduct.quantity},${billProduct.total_price},'${billProduct.created_date}')`;
	return db.save(sql);
}

exports.getBillProductByUserId = (userId) => {
	var sql = `Select * from bill_product where userId=${userId} order by created_date  DESC`;
	return db.load(sql);
}


exports.getBillProductById = (id) => {
	var sql = `Select * from bill_product where id=${id}`;
	return db.load(sql);
}

exports.updateBillByManager = (bill,id) => {
	var sql = `update bill_product set status=${bill.status} where id=${id}`;
	return db.save(sql);
}

//Su dung callback
/*
var BillProducts={

    addBillProduct:function(billProduct,callback){
        return db.query("Insert into bill_product(userId,product_name,category_name,company_name,"
            +"quantity,total_price,"
            +"created_date) values(?,?,?,?,?,?,?)",
        [billProduct.userId,billProduct.product_name,billProduct.category_name,billProduct.company_name,
        billProduct.quantity,billProduct.total_price
        ,billProduct.created_date],callback);
    },

    getBillProductByUserId:function(userId,callback){
        return db.query("Select * from bill_product where userId=? order by created_date  DESC ",[userId],callback);
    },

    getBillProductById:function(id,callback){
        return db.query("Select * from bill_product where id=?",[id],callback);
    }
}

module.exports=BillProducts;

*/