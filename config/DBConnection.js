var mysql=require('mysql');

//Database
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'shoponline'
});
module.exports=connection;