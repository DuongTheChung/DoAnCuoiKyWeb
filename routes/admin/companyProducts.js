var express=require('express');
var dateTime=require('node-datetime');
var router=express.Router();

var CompanyProductsModel=require('../../models/companyProducts');
var strHelper=require('../../helper/strReplace');

//Pagination
var totalCompanyProduct = 0;
var pageSize = 4;
var pageCount = 0;
var start = 0;
var currentPage = 1;

//GET CompanyProduct Home
router.get('/',(req,res)=>{
    if(req.session.errors){
        req.session.errors=null;
    }
    CompanyProductsModel.companyCount(function(err,result) {
        if(err) throw err;
        totalCompanyProduct =result[0].count;
        pageCount = Math.ceil(totalCompanyProduct/pageSize);
        if (typeof req.query.page !== 'undefined') {
          currentPage = req.query.page;
        }
    
        if(parseInt(currentPage)==1){
          start=0;
        }
        if(parseInt(currentPage)>1){
            start=(currentPage - 1) * pageSize;
        }
    
        CompanyProductsModel.getAllCompanyProductPaging({offset: start,limit : pageSize}, function(err,results){
          if(err){
            res.json(err);
          }else{
            res.render('admin/components/companyProducts/homeCompanyProducts',{
                title: 'Home CompanyProduct',       
                CompanyProducts: results, 
                pageCount: pageCount, 
                pageSize: pageSize, 
                currentPage: currentPage
            });
          }
        });
    });
});



//GET CompanyProduct add
router.get('/add-companyproduct',(req,res)=>{
    var errors;
    if(req.session.errors){
        errors=req.session.errors;
    }else{
        req.session.errors=null;
    }
    res.render('admin/components/companyProducts/addCompanyProducts',{
        errors:errors,
        title:'Add CompanyProduct'
    });
});

//POST CompanyProduct add
router.post('/add-companyproduct',(req,res)=>{
    req.checkBody('name','Name must has a value').notEmpty();
    req.checkBody('display_order','Display order must has a value').notEmpty();
    req.checkBody('email','Email must has a value').notEmpty();
    req.checkBody('phone','Phone must has a value').notEmpty();
    req.checkBody('created_by','Created by must has a value').notEmpty();
    var name=req.body.name;
    var meta_title=strHelper.myReplace(name);
    var display_order=parseInt(req.body.display_order,10);
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    var created_date=date;
    var created_by=req.body.created_by;
    var email=req.body.email;
    var phone=req.body.phone;

    var errors=req.validationErrors();
    if(errors){
        req.session.errors=errors;
        res.redirect('/admin/companyproduct/add-companyproduct');
    }else{
        CompanyProductsModel.findCompanyProductByName(name,(err,results)=>{
            if(results != ""){
                req.flash('danger','Company already exists');
                res.redirect('/admin/companyproduct/add-companyproduct');
            }else{
                var companyProduct={
                    "name":name,
                    "meta_title":meta_title,
                    "display_order":display_order,
                    "email":email,
                    "phone":phone,
                    "created_date":created_date,
                    "created_by":created_by
                };

                CompanyProductsModel.addCompanyProduct(companyProduct,(err,result)=>{
                    if(err){
                        return console.log(err);
                    }else{
                        req.flash('success','Company added success');
                        res.redirect('/admin/companyproduct');
                    }
                });
            }
        });
    }
});

//GET CompanyProduct edit
router.get('/edit-companyproduct/:id',(req,res)=>{
    var errors;
    if(req.session.errors){
        errors=req.session.errors;
    }else{
        req.session.errors=null;
    }
    CompanyProductsModel.getCompanyProductById(req.params.id,(err,result)=>{
        if(err){
            return console.log(err);
        }else{
            res.render('admin/components/companyProducts/editCompanyProducts',{
                title:'Edit CompanyProduct',
                errors:errors,
                name:result[0].name,
                display_order:result[0].display_order,
                email:result[0].email,
                phone:result[0].phone,
                id:result[0].id,
                modified_by:result[0].modified_by
            });
        }
    });
});

//POST CompanyProduct edit
router.post('/edit-companyproduct/:id',(req,res)=>{
    req.checkBody('name','Name must has a value').notEmpty();
    req.checkBody('display_order','Display order must has a value').notEmpty();
    req.checkBody('email','Email must has a value').notEmpty();
    req.checkBody('phone','Phone must has a value').notEmpty();
    req.checkBody('modified_by','Modified by must has a value').notEmpty();
    var id=req.params.id;
    var name=req.body.name;
    var meta_title=strHelper.myReplace(name);
    var display_order=parseInt(req.body.display_order,10);
    var email=req.body.email;
    var phone=req.body.phone;
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    var modified_date=date;
    var modified_by=req.body.modified_by;
    
    var errors=req.validationErrors();
    if(errors){
        req.session.errors=errors;
        res.redirect('/admin/companyproduct/edit-companyproduct/'+id);
    }else{
        CompanyProductsModel.findCompanyProductByMetatitle(meta_title,id,(err,results)=>{
            if(results != ""){
                req.flash('danger','CompanyProduct already exists');
                res.redirect('/admin/companyproduct/edit-companyproduct/'+id);
            }else{
                var companyProduct={
                    "name":name,
                    "meta_title":meta_title,
                    "display_order":display_order,
                    "email":email,
                    "phone":phone,
                    "modified_date":modified_date,
                    "modified_by":modified_by
                };

                CompanyProductsModel.updateCompanyProduct(id,companyProduct,(err,result)=>{
                    if(err){
                        return console.log(err);
                    }else{
                        req.flash('success','CompanyProduct edited success');
                        res.redirect('/admin/companyproduct');
                    }

                });
            }
        });
    }
});


//GET Delete CompanyProduct
router.get('/delete-companyproduct/:id',(req,res)=>{
    CompanyProductsModel.deleteCompanyProduct(req.params.id,(err,result)=>{
        if(err){
            return console.log(err);
        }else{
            req.flash('success','CompanyProduct Deleted success');
            res.redirect('/admin/companyproduct');
        }
    })
});
module.exports=router;