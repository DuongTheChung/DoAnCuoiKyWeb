//Config passport
var LocalStrategy=require('passport-local').Strategy;
var UserModel=require('../models/users');
var bcrypt=require('bcryptjs');

module.exports=function(passport){

    passport.use(new LocalStrategy(function(username,password,done){
        UserModel.findOneUserByName(username,(err,user)=>{
            if(err){
                console.log(err);
            }
            if(user==""){
                return done(null,false,{message:'No user found'});
            }

            bcrypt.compare(password,user[0].password,(err,isMatch)=>{
                if(err){
                    console.log(err);
                }
                if(isMatch){
                    return done(null,user);
                }else{
                    return done(null,false,{message:'Wrong password'});
                }
            });
        });
    }));

    passport.serializeUser((user,done)=>{
        done(null,user[0].id);
    });

    passport.deserializeUser((id,done)=>{
        UserModel.findUserById(id,(err,user)=>{
            done(err,user);
        });
    });
}