var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render('client/index',{
        title:'Home'
    });
})

module.exports=router;