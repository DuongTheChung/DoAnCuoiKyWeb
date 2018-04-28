var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'shoponline',
    insecureAuth : true
 
});
module.exports=connection;