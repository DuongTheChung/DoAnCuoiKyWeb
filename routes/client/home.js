var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render('client/components/home',{
        title:'Home'
    });
});

module.exports=router;