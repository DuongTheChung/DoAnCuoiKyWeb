var express=require('express');
var dateTime=require('node-datetime');
var router=express.Router();

var Categories=require('../../models/categories');

//Pagination
var totalCategory = 0;
var pageSize = 2;
var pageCount = 0;
var start = 0;
var currentPage = 1;

//GET category index
router.get('/',(req,res)=>{
    Categories.categoryCount(function(err,categories) {
        if(err) throw err;
        totalCategory =categories[0].count;
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
    
        Categories.getAllCategory({offset: start,limit : pageSize}, function(err,result){
          if(err){
            res.json(err);
          }else{
            res.render('admin/components/categories/homeCategories',{
                title: 'Home Category',       
                categories: result, 
                pageCount: pageCount, 
                pageSize: pageSize, 
                currentPage: currentPage
            });
          }
        });
    });
});

//GET category add
router.get('/add-category',(req,res)=>{
    res.render('admin/components/categories/addCategories',{
        title:'Add category'
    });
});

//POST category add
router.post('/add-category',(req,res)=>{
    req.checkBody('name','Name must has a value').notEmpty();
    req.checkBody('display_order','Display order must has a value').notEmpty();
    req.checkBody('created_by','Created by must has a value').notEmpty();
    var name=req.body.name;
    var meta_title=name.replace(/\s+/g,'-').toLowerCase();
    var display_order=parseInt(req.body.display_order,10);
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    var created_date=date;
    var created_by=req.body.created_by;

    var errors=req.validationErrors();
    if(errors){
        res.render('admin/components/categories/addCategories',{
            errors:errors,
            title:'Add category'
        });
    }else{
        Categories.findCategoryByName(name,(err,categories)=>{
            if(categories != ""){
                req.flash('danger','Category already exists');
                res.render('admin/components/categories/addCategories',{
                    title:'Add category'
                });
            }else{
                var category={
                    "name":name,
                    "meta_title":meta_title,
                    "display_order":display_order,
                    "created_date":created_date,
                    "created_by":created_by
                };

                Categories.addCategory(category,(err,categories)=>{
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
router.get('/edit-category/:id',(req,res)=>{
    Categories.getCategoryById(req.params.id,(err,category)=>{
        if(err){
            return console.log(err);
        }else{
            res.render('admin/components/categories/editCategories',{
                name:category[0].name,
                display_order:category[0].display_order,
                id:category[0].id,
                modified_by:category[0].modified_by,
                title:'Edit Category'
            });
        }
    });
});

//POST Category edit
router.post('/edit-category/:id',(req,res)=>{
    req.checkBody('name','Name must has a value').notEmpty();
    req.checkBody('display_order','Display order must has a value').notEmpty();
    req.checkBody('modified_by','Modified by must has a value').notEmpty();
    var id=req.params.id;
    var name=req.body.name;
    var meta_title=name.replace(/\s+/g,'-').toLowerCase();
    var display_order=parseInt(req.body.display_order,10);
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    var modified_date=date;
    var modified_by=req.body.modified_by;
    
    var errors=req.validationErrors();
    if(errors){
        res.render('admin/components/categories/editCategories',{
            errors:errors,
            name:name,
            display_order:display_order,
            modified_by:modified_by,
            id:id,
            title:'Edit category'
        });
    }else{
        Categories.findCategoryByMetatitle(meta_title,id,(err,categories)=>{
            if(categories != ""){
                req.flash('danger','Category already exists');
                    res.render('admin/components/categories/editCategories',{
                        name:name,
                        display_order:display_order,
                        modified_by:modified_by,
                        id:id,
                        title:'Edit category'
                });
            }else{
                var category={
                    "name":name,
                    "meta_title":meta_title,
                    "display_order":display_order,
                    "modified_date":modified_date,
                    "modified_by":modified_by
                };

                Categories.updateCategory(id,category,(err,categories)=>{
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
router.get('/delete-category/:id',(req,res)=>{
    Categories.deleteCategory(req.params.id,(err,category)=>{
        if(err){
            return console.log(err);
        }else{
            req.flash('success','Category Deleted success');
            res.redirect('/admin/category');
        }
    })
});
module.exports=router;