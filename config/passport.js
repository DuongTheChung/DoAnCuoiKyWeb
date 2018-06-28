//Config passport
var LocalStrategy=require('passport-local').Strategy;
var UserModel=require('../models/users');
var bcrypt=require('bcryptjs');

module.exports=function(passport){

    passport.use(new LocalStrategy(function(username,password,done){
        UserModel.findOneUserByName(username).then(user=>{
            if(user.length==0){
                return done(null,false,{message:'Không tìm thấy người dùng'});
            }
            bcrypt.compare(password,user[0].password,(err,isMatch)=>{
                if(err){
                    console.log(err);
                }
                if(isMatch){
                    if(user[0].status==0){
                        return done(null,false,{message:'Tài khoản đang bị khóa'});
                    }else{
                        return done(null,user);
                    }
                }else{
                    return done(null,false,{message:'Mật khẩu không chính xác'});
                }
            });
        });
    }));

    passport.serializeUser((user,done)=>{
        done(null,user[0].id);
    });

    passport.deserializeUser((id,done)=>{
        UserModel.findUserById(id).then(function(user) {
            done(null, user);
        }).catch(function (err) {
            console.log(err);
        })
    });
}