var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render('client/components/checkout',{
        title:'Cart'
    });
});

module.exports=router;