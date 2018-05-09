//User
var db=require('../config/DBConnection');

var User={
    findOneUser:function(username,callback){
        return db.query("select * from user where username=?",[username],callback);
    },

    findUserById:function(id,callback){
        return db.query("select * from user where id=?",[id],callback);
    },

    addUser:function(user,callback){
        return db.query("Insert into user(username,email,password,admin) values(?,?,?,?)",[user.username,
        user.email,user.password,user.admin],callback);
    }
}

module.exports=User;