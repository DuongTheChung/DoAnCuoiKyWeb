var express=require('express');
var router=express.Router();
var passport=require('passport');
var bcrypt=require('bcryptjs');

var UserModel=require('../../models/users');

//GET register
router.get('/register',(req,res)=>{
    res.render('client/components/account/register',{
        title:'Register'
    });
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
        console.log('err');
        res.render('client/components/account/register',{
            title:'Register',
            errors:errors
        });
        
    }else{
        UserModel.findOneUser(username,(err,user)=>{
            if(err){
                return console.log(err);
            }
            if(user != ""){
                req.flash('danger','User exists');
                res.redirect('/users/register');
            }else{
                var user={
                    "username":username,
                    "email":email,
                    "password":password,
                    "admin":0
                };

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(user.password,salt,(err,hash)=>{
                        if(err){
                            return console.log(err);
                        }else{
                            user.password=hash;
                            UserModel.addUser(user,(err,user)=>{
                                if(err){
                                    return console.log(err);
                                }else{
                                    res.redirect('/users/login');               
                                }
                            });
                        }
                    });
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

module.exports=router;