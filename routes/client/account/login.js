var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render('client/components/account/login',{
        title:'Account Login'
    });
});

module.exports=router;