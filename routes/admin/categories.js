var express=require('express');
var dateTime=require('node-datetime');
var router=express.Router();

var CategoriesModel=require('../../models/categories');
var strHelper=require('../../helper/strReplace');
var auth=require('../../config/auth');
var isAdmin=auth.isAdmin;

//Pagination
var totalCategory = 0;
var pageSize = 4;
var pageCount = 0;
var start = 0;
var currentPage = 1;

//GET category home
router.get('/',isAdmin,(req,res)=>{
    if(req.session.errors){
        req.session.errors=null;
    }
    CategoriesModel.categoryCount(function(err,results) {
        if(err) throw err;
        totalCategory =results[0].count;
        pageCount = Math.ceil(totalCategory/pageSize);
        if (typeof req.query.page !== 'undefined') {
          currentPage = req.query.page;
        }
    
        if(parseInt(currentPage)==1){
          start=0;
        }
        if(parseInt(currentPage)>1){
            start=(currentPage - 1) * pageSize;
        }
    
        CategoriesModel.getAllCategoryPaging({offset: start,limit : pageSize}, function(err,results){
          if(err){
            res.json(err);
          }else{
            res.render('admin/components/categories/homeCategories',{
                title: 'Home Category',       
                categories: results, 
                pageCount: pageCount, 
                pageSize: pageSize, 
                currentPage: currentPage
            });
          }
        });
    });
});

//GET category add
router.get('/add-category',isAdmin,(req,res)=>{
    var errors;
    if(req.session.errors){
        errors=req.session.errors;
    }else{
        req.session.errors=null;
    }
    res.render('admin/components/categories/addCategories',{
        title:'Add category',
        errors:errors
    });
});

//POST category add
router.post('/add-category',isAdmin,(req,res)=>{
    req.checkBody('name','Name must has a value').notEmpty();
    req.checkBody('display_order','Display order must has a value').notEmpty();
    req.checkBody('created_by','Created by must has a value').notEmpty();
    var name=req.body.name;
    var meta_title=strHelper.myReplace(name);
    var display_order=parseInt(req.body.display_order,10);
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    var created_date=date;
    var created_by=req.body.created_by;

    var errors=req.validationErrors();
    if(errors){
        req.session.errors=errors;
        res.redirect('/admin/category/add-category');
    }else{
        CategoriesModel.findCategoryByName(name,(err,results)=>{
            if(results != ""){
                req.flash('danger','Category already exists');
                res.redirect('/admin/category/add-category');
            }else{
                var category={
                    "name":name,
                    "meta_title":meta_title,
                    "display_order":display_order,
                    "created_date":created_date,
                    "created_by":created_by
                };

                CategoriesModel.addCategory(category,(err,result)=>{
                    if(err){
                        return console.log(err);
                    }else{
                        req.flash('success','Category added success');
                        res.redirect('/admin/category');
                    }
                });
            }
        });
    }
});


//GET Category edit
router.get('/edit-category/:id',isAdmin,(req,res)=>{
    var errors;
    if(req.session.errors){
        errors=req.session.errors;
    }else{
        req.session.errors=null;
    }
    CategoriesModel.getCategoryById(req.params.id,(err,result)=>{
        if(err){
            return console.log(err);
        }else{
            res.render('admin/components/categories/editCategories',{
                title:'Edit Category',
                errors:errors,
                name:result[0].name,
                display_order:result[0].display_order,
                id:result[0].id,
                modified_by:result[0].modified_by
            });
        }
    });
});

//POST Category edit
router.post('/edit-category/:id',isAdmin,(req,res)=>{
    req.checkBody('name','Name must has a value').notEmpty();
    req.checkBody('display_order','Display order must has a value').notEmpty();
    req.checkBody('modified_by','Modified by must has a value').notEmpty();
    var id=req.params.id;
    var name=req.body.name;
    var meta_title=strHelper.myReplace(name);
    var display_order=parseInt(req.body.display_order,10);
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    var modified_date=date;
    var modified_by=req.body.modified_by;
    
    var errors=req.validationErrors();
    if(errors){
        req.session.errors=errors;
        res.redirect('/admin/category/edit-category/'+id);
    }else{
        CategoriesModel.findCategoryByMetatitleOtherId(meta_title,id,(err,results)=>{
            if(results != ""){
                req.flash('danger','Category already exists');
                res.redirect('/admin/category/edit-category/'+id);
            }else{
                var category={
                    "name":name,
                    "meta_title":meta_title,
                    "display_order":display_order,
                    "modified_date":modified_date,
                    "modified_by":modified_by
                };

                CategoriesModel.updateCategory(id,category,(err,result)=>{
                    if(err){
                        return console.log(err);
                    }else{
                        req.flash('success','Category edited success');
                        res.redirect('/admin/category');
                    }

                });
            }
        });
    }
});


//GET Delete category
router.get('/delete-category/:id',isAdmin,(req,res)=>{
    CategoriesModel.deleteCategory(req.params.id,(err,result)=>{
        if(err){
            return console.log(err);
        }else{
            req.flash('success','Category Deleted success');
            res.redirect('/admin/category');
        }
    })
});
module.exports=router;