var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render('client/components/contact',{
        title:'Contact'
    });
});

module.exports=router;