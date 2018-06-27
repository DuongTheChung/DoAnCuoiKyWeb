var db=require('../config/DBConnection');


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