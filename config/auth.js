//Auth
exports.isUser=function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/users/login');
    }
}

exports.isAdmin=function(req,res,next){
    if(req.isAuthenticated() && res.locals.user[0].name=='admin'||res.locals.user[0].name=='manager'){
        next();
    }else{
        res.redirect('/users/login');
    }
}