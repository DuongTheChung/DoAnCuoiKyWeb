var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render('client/components/single',{
        title:'Product'
    });
});

module.exports=router;