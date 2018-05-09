var express=require('express');
var router=express.Router();
var auth=require('../../config/auth');
var isAdmin=auth.isAdmin;


router.get('/',isAdmin,(req,res)=>{
    res.render('admin/index',{
        title:'Home admin'
    });
});

module.exports=router;