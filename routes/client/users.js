var express=require('express');
var router=express.Router();
var passport=require('passport');
var bcrypt=require('bcryptjs');

var UserModel=require('../../models/users');

//GET register
router.get('/register',(req,res)=>{
    var errors;
    if(req.session.errors){
      errors=req.session.errors;
    }else{
      req.session.errors=null;
    }
    res.render('client/components/account/register',{
        title:'Register',
        errors:errors
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
        req.session.errors=errors;
        res.redirect('/users/register');
    }else{
        UserModel.findOneUserByName(username,(err,user)=>{
            if(err){
                return console.log(err);
            }
            if(user != ""){
                req.flash('danger','Username exists');
                res.redirect('/users/register');
            }else{

                UserModel.findOneUserByEmail(email,(err,user1)=>{
                    if(err){
                        return console.log(err);
                    }
                    if(user1 != ""){
                        req.flash('danger','Email exists');
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
                                            req.flash('success','User register success');
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

router.get('/detail/:id',(req,res)=>{

    if(req.session.errors){
        req.session.errors=null;
    }
    var id=req.params.id;
    UserModel.findUserById(id,(err,user)=>{
        if(err){
            console.log(err);
        }else{
            res.render('client/components/account/accountDetail',{
                title:'User Detail',
                user:user
            });
        }
    })
});

//GET update user

router.get('/update/:id',(req,res)=>{
    var errors;
    if(req.session.errors){
      errors=req.session.errors;
    }else{
      req.session.errors=null;
    }
        UserModel.findUserById(req.params.id,(err,user)=>{
        if(err){
            return console.log(err);
        }else{
            res.render('client/components/account/editAccount',{
                title:'Update user',
                user:user,
                errors:errors  
            });
        }
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
        UserModel.findOneUserByUsernameOtherId(username,id,(err,user)=>{
            if(err){
                return console.log(err);
            }
            if(user != ""){
                req.flash('danger','UserName is exists');
                res.redirect('/users/update/'+id);
            }else{
                UserModel.findOneUserByEmailOtherId(email,id,(err,user1)=>{
                    if(err){
                        return console.log(err);
                    }
                    if(user1 != ""){
                        req.flash('danger','Email is exists');
                        res.redirect('/users/update/'+id);
                    }else{
                        var user={
                            "username":username,
                            "email":email
                        };

                        UserModel.updateUser(user,id,(err,result)=>{
                            if(err){
                                return console.log(err);
                            }else{
                                req.flash('success','User update success');
                                res.redirect('/users/detail/'+id);
                               
                            }
                        });
                    }
                });
            }
        });
    }
});
module.exports=router;