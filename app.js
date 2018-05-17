var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var session=require('express-session');
var expressValidator=require('express-validator');
var fileUpload=require('express-fileupload');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport=require('passport');
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

//varilable local
app.locals.errors=null;
app.locals.categories=null;
app.locals.companyProducts=null;

//File Upload

app.use(fileUpload());

//express session
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 1800000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'false',
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

//Passport middleware
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


app.get('*',(req,res,next)=>{
  res.locals.cart=req.session.cart;
  res.locals.user=req.user || null;
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
var homeClient=require('./routes/client/home');
var contactClient=require('./routes/client/contact');
var productsClient=require('./routes/client/products');
var aboutClient=require('./routes/client/about');
var cartClient=require('./routes/client/cart');
var singleClient=require('./routes/client/single');
var users=require('./routes/client/users');

app.use('/',homeClient);
app.use('/contact',contactClient);
app.use('/products',productsClient);
app.use('/about',aboutClient);
app.use('/cart',cartClient);
app.use('/single',singleClient);
app.use('/users',users);

//Load common 
//Load header categories
var CategoriesModel=require('./models/categories');
CategoriesModel.getAllCategory((err,results)=>{
  if(err){
    return console.log(err);
  }else{
    app.locals.categories=results;
  }
});
//Load header companyProduct
var CompanyProductsModel=require('./models/companyProducts');
CompanyProductsModel.getAllCompanyProduct((err,results)=>{
  if(err){
    return console.log(err);
  }else{
    app.locals.companyProducts=results;
  }
});


//set server
var port=3000;
app.listen(port,()=>{
  console.log('Server started on port '+ port);
});


