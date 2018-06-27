//User
var db=require('../config/DBConnection');

//Su dung Promise
exports.findOneUserByName = (username) => {
	var sql = `select * from user where username='${username}'`;
	return db.load(sql);
}

exports.findOneUserByEmail = (email) => {
	var sql = `select * from user where email='${email}'`;
	return db.load(sql);
}

exports.findOneUserByUsernameOtherId = (username,id) => {
	var sql = `select * from user where username='${username}' and id != ${id}`;
	return db.load(sql);
}

exports.findOneUserByEmailOtherId = (email,id) => {
	var sql = `select * from user where email='${email}' and id != ${id}`;
	return db.load(sql);
}


exports.findUserById = (id) => {
	var sql = `select * from user where id=${id}`;
	return db.load(sql);
}

exports.addUser = (user) => {
	var sql = `Insert into user(username,email,password,admin) values('${user.username}','${user.email}','${user.password}',${user.admin})`;
	return db.save(sql);
}

exports.updateUser = (user,id) => {
	var sql = `update user set username='${user.username}',email='${user.email}' where id=${id}`;
	return db.save(sql);
}


//Su dung callback
/*
var User={
    findOneUserByName:function(username,callback){
        return db.query("select * from user where username=?",[username],callback);
    },

    findOneUserByEmail:function(email,callback){
        return db.query("select * from user where email=?",[email],callback);
    },

    findOneUserByUsernameOtherId:function(username,id,callback){
        return db.query("select * from user where username=? and id != ?",[username,id],callback);
    },

    findOneUserByEmailOtherId:function(email,id,callback){
        return db.query("select * from user where email=? and id != ?",[email,id],callback);
    },

    findUserById:function(id,callback){
        return db.query("select * from user where id=?",[id],callback);
    },

    addUser:function(user,callback){
        return db.query("Insert into user(username,email,password,admin) values(?,?,?,?)",[user.username,
        user.email,user.password,user.admin],callback);
    },

    updateUser:function(user,id,callback){
        return db.query("update user set username=?,email=? where id=? ",[user.username,user.email,id],callback);
    }

}

module.exports=User;

*/