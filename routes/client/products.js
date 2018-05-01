var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render('client/components/products',{
        title:'Products'
    });
});

module.exports=router;