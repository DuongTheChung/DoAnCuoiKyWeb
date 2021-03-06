var express=require('express');
var router=express.Router();
var passport=require('passport');
var bcrypt=require('bcryptjs');

var UserModel=require('../../models/users');
var BillProductModel=require('../../models/billProducts');
var auth=require('../../config/auth');

var isUser=auth.isUser;
//GET register
router.get('/register',(req,res)=>{
    var errors;
    if(res.locals.user){
        res.redirect('/');  
    }else{
        if(req.session.errors){
        errors=req.session.errors;
        }else{
        req.session.errors=null;
        }
        res.render('client/components/account/register',{
            title:'Register',
            errors:errors
        });
    }
});

//POST register

router.post('/register',(req,res)=>{
    var username=req.body.username;
    var email=req.body.email;
    var password=req.body.password;
    var confirm_password=req.body.confirm_password;

    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('email','Email is required').isEmail();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('confirm_password','Passwords do not match ').equals(password);

    var errors=req.validationErrors();

    if(errors){
        req.session.errors=errors;
        res.redirect('/users/register');
    }else{
        UserModel.findOneUserByName(username).then(user=>{
            if(user.length>0){
                req.flash('danger','Username exists');
                res.redirect('/users/register');
            }else{
                UserModel.findOneUserByEmail(email).then(user1=>{
                    if(user1.length>0){
                        req.flash('danger','Email exists');
                        res.redirect('/users/register');
                    }else{
                        var user={
                            "username":username,
                            "email":email,
                            "password":password
                        };
        
                        bcrypt.genSalt(10,(err,salt)=>{
                            bcrypt.hash(user.password,salt,(err,hash)=>{
                                if(err){
                                    return console.log(err);
                                }else{
                                    user.password=hash;
                                    UserModel.addUser(user).then(user2=>{
                                        req.flash('success','User register success');
                                        res.redirect('/users/login');
                                             
                                    });
                                }
                                });
                            });
                        }
                    });
                }
            });

        }
});
 

//GET login page
router.get('/login',(req,res)=>{
    if(res.locals.user){
        res.redirect('/');  
    }
    res.render('client/components/account/login',{
        title:'Login'
    });
});

//POST login 
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next);
});

//GET logout

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/users/login');
});

//GET user detail

router.get('/detail/:id',isUser,(req,res)=>{

    if(req.session.errors){
        req.session.errors=null;
    }
    var id=req.params.id;
    UserModel.findUserById(id).then(user=>{
        BillProductModel.getBillProductByUserId(id).then(result=>{
            res.render('client/components/account/accountDetail',{
                title:'User Detail',
                user:user,
                billProducts:result
            });
        });
    });
});

//GET update user

router.get('/update/:id',isUser,(req,res)=>{
    var errors;
    if(req.session.errors){
      errors=req.session.errors;
    }else{
      req.session.errors=null;
    }
    UserModel.findUserById(req.params.id).then(user=>{
        res.render('client/components/account/editAccount',{
            title:'Update user',
            user:user,
            errors:errors  
        });
    });
});

//POST update user

router.post('/update/:id',(req,res)=>{
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('email','Email is required').isEmail();
    
    var username=req.body.username;
    var email=req.body.email;
    var id=req.params.id;

    var errors=req.validationErrors();
    if(errors){
        req.session.errors=errors;
        res.redirect('/users/update/'+id);
    }else{
        UserModel.findOneUserByUsernameOtherId(username,id).then(user=>{
            if(user.length>0){
                req.flash('danger','UserName is exists');
                res.redirect('/users/update/'+id);
            }else{
                UserModel.findOneUserByEmailOtherId(email,id).then(user1=>{
                    if(user1.length>0){
                        req.flash('danger','Email is exists');
                        res.redirect('/users/update/'+id);
                    }else{
                        var user={
                            "username":username,
                            "email":email
                        };

                        UserModel.updateUser(user,id).then(result=>{
                            req.flash('success','User update success');
                            res.redirect('/users/detail/'+id);
                               
                        });
                    }
                });
            }
        });
    }
});

//GET Detail Bill
router.get('/billdetail/:id',isUser,(req,res)=>{
    var id=req.params.id;
    BillProductModel.getBillProductById(id).then(result=>{  
        res.render('client/components/account/detailBillProduct',{
            title:'Bill Detail',
            bill:result[0]
        });
    });
});
module.exports=router;