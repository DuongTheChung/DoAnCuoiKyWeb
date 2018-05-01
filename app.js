var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var session=require('express-session');
var expressValidator=require('express-validator');
var fileUpload=require('express-fileupload');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var connection=require('./config/DBConnection');

var sessionStore = new session.MemoryStore;

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

//File Upload

app.use(fileUpload());

//express session
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
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
  },

  customValidators: {
    isImage : function(value,filename){
      var extension=(path.extname(filename)).toLowerCase();

      switch(extension){
        case '.jpg':
          return '.jpg';
        case '.jpeg':
          return '.jpeg';
        case '.png':
          return '.png';
        case '':
          return false;
        default:
          return false;
      }
    }
  }
}));

//Express message
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//admin router
var admin=require('./routes/admin/index');
var categoriesAdmin=require('./routes/admin/categories');
var companyProductAdmin=require('./routes/admin/companyProducts');
var productsAdmin=require('./routes/admin/products');
app.use('/admin',admin);
app.use('/admin/category',categoriesAdmin);
app.use('/admin/companyproduct',companyProductAdmin);
app.use('/admin/product',productsAdmin);


//client router
var client=require('./routes/client/index');
app.use('/',client);

//set server

var port=3000;
app.listen(port,()=>{
  console.log('Server started on port '+ port);
});


