var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render('client/components/account/register',{
        title:'Account Register'
    });
});

module.exports=router;