//Auth
exports.isUser=function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/users/login');
    }
}

exports.isAdmin=function(req,res,next){
    if(req.isAuthenticated() && res.locals.user[0].admin==1){
        next();
    }else{
        res.redirect('/users/login');
    }
}