var express=require('express');
var path=require('path');

//init app
var app=express();

//set path views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


//set public client folder
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public/admin')));


var homeClient=require('./routes/client/index');
var homeAdmin=require('./routes/admin/index');
app.use('/admin',homeAdmin);
app.use('/',homeClient);

//set server

var port=3000;
app.listen(port,()=>{
  console.log('Server started on port '+ port);
});




