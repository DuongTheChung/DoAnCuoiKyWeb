var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var session=require('express-session');
var expressValidator=require('express-validator');
var connection=require('./config/DBConnection');

//connect database
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
//init app
var app=express();



//set path views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(express.static(path.join(__dirname,'public')));

//body-parser middware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.locals.errors=null;

//express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//express Validator
app.use(expressValidator({
  errorFormatter: function(param,msg,value){
    var namespace=param.split('.')
    ,root =namespace.shift()
    ,formParam=root;

    while(namespace.length){
      formParam+='[' + namespace.shift() + ']';
    }

    return{
      param:formParam,
      msg  :msg,
      value:value
    };
  }
}));

//Express message
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//admin router
var admin=require('./routes/admin/index');
var categoriesAdmin=require('./routes/admin/categories');
app.use('/admin',admin);
app.use('/admin/category',categoriesAdmin);

//client router
var client=require('./routes/client/index');
app.use('/',client);

//set server

var port=3000;
app.listen(port,()=>{
  console.log('Server started on port '+ port);
});


