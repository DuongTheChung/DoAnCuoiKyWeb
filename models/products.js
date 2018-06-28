var db=require('../config/DBConnection');

exports.getLimitProduct = () => {
	var sql = `select * from product order by created_date DESC Limit 10`;
	return db.load(sql);
}

exports.getProductTopView = () => {
	var sql = `select * from product order by view_count DESC Limit 10`;
	return db.load(sql);
}

exports.getProductSameCategoryLimit = (categoryName,productName) => {
	var sql = `select * from product where parent_category='${categoryName}' and name <> '${productName}' order by display_order Limit 5`;
	return db.load(sql);
}


exports.getProductSameCompanyLimit = (companyName,productName) => {
	var sql = `select * from product where parent_company='${companyName}' and name <> '${productName}' order by display_order Limit 5`;
	return db.load(sql);
}

exports.getProductSalesBest = () => {
	var sql = `select * from product order by sales_count DESC Limit 10 `;
	return db.load(sql);
}

exports.getProductSalesBest = () => {
	var sql = `select * from product order by sales_count DESC Limit 10 `;
	return db.load(sql);
}

exports.getAllProduct = () => {
	var sql = `select * from product order by sales_count DESC Limit 10 `;
	return db.load(sql);
}

exports.getAllProductByCategory = (parent_category,offset,limit) => {
	var sql = `select * from product where parent_category='${parent_category}' order by display_order Limit ${offset},${limit}`;
	return db.load(sql);
}

exports.getAllProductByCompany = (parent_company,offset,limit) => {
	var sql = `select * from product where parent_company='${parent_company}' order by display_order Limit ${offset},${limit}`;
	return db.load(sql);
}

exports.getAllProductPaging = (offset,limit) => {
	var sql = `select * from product order by display_order Limit ${offset},${limit}`;
	return db.load(sql);
}


exports.productCount = () => {
	var sql = `select count(1) as count from product`;
	return db.load(sql);
}

exports.productCountByCategory = (parent_category) => {
	var sql = `select count(1) as count from product where parent_category='${parent_category}'`;
	return db.load(sql);
}


exports.productCountByCompany = (parent_company) => {
	var sql = `select count(1) as count from product where parent_company='${parent_company}'`;
	return db.load(sql);
}


exports.getProductById = (id) => {
	var sql = `select * from product where id=${id}`;
	return db.load(sql);
}


exports.findProductByName = (name) => {
	var sql = `select* from product where name='${name}'`;
	return db.load(sql);
}



exports.findProductByMetatitle = (meta_title) => {
	var sql = `select* from product where meta_title='${meta_title}'`;
	return db.load(sql);
}


exports.findProductByMetatitleOtherId = (meta_title,id) => {
	var sql = `select * from product where meta_title='${meta_title}' and id != ${id}`;
	return db.load(sql);
}


exports.addProduct = (product) => {
	var sql = `insert into product(name,meta_title,parent_category,parent_company,display_order,description,price,`
    +`image,quantity,created_by,created_date) `
    +`values('${product.name}', '${product.meta_title}','${product.parent_category}','${product.parent_company}',${product.display_order},'${product.description}',${product.price}`
    +`,'${product.image}',${product.quantity},'${product.created_by}','${product.created_date}')`;
	return db.save(sql);
}

exports.deleteProduct = (id) => {
	var sql = `delete from product where id=${id}`;
	return db.save(sql);
}


exports.updateProduct = (id,product) => {
	var sql = `update product set `
    +`name='${product.name}',meta_title='${product.meta_title}',parent_category='${product.parent_category}',parent_company='${product.parent_company}',display_order=${product.display_order},`
    +`description='${product.description}',price=${product.price},image='${product.image}',quantity=${product.quantity},modified_by='${product.modified_by}',modified_date='${product.modified_date}' where id=${id}`;
	return db.save(sql);
}

exports.updateViewCountProduct = (id,count) => {
	var sql = `update product set view_count=${count} where id=${id}`;
	return db.save(sql);
}



exports.updateQuantityProduct = (id,quantity) => {
	var sql = `update product set quantity=${quantity} where id=${id}`;
	return db.save(sql);
}


exports.updateSalesCountProduct = (id,sales_count) => {
	var sql = `update product set sales_count=${sales_count} where id=${id}`;
	return db.save(sql);
}

exports.searchProductAndGetCount = (search) => {
	var sql = `select count(1) as count from product where name like '${search}'`;
	return db.load(sql);
}

exports.getAllProductByKeySearch = (search,offset,limit) => {
	var sql = `select * from product where name like '${search}' order by display_order Limit ${offset},${limit}`;
	return db.load(sql);
}


exports.searchProductByPriceAndGetCount = (minPrice,maxPrice) => {
	var sql = `select count(1) as count from product where price >=${minPrice} and price <=${maxPrice}`;
	return db.load(sql);
}


exports.getAllProductFromPriceSearch = (minPrice,maxPrice,offset,limit) => {
	var sql = `select * from product where price >=${minPrice} and price <=${maxPrice} order by display_order Limit ${offset},${limit}`;
	return db.load(sql);
}

//Su dung callback

/*
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
    },
    updateQuantityProduct:function(id,quantity,callback){
        return db.query("update product set "
        +"quantity=? where id=?",
        [quantity,id],callback);
    },

    updateSalesCountProduct:function(id,sales_count,callback){
        return db.query("update product set "
        +"sales_count=? where id=?",
        [sales_count,id],callback);
    }

}

module.exports=Product;
*/