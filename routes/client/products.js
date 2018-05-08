var express=require('express');
var router=express.Router();

var ProductsModel=require('../../models/products');
var CategoriesModel=require('../../models/categories');
var CompanyProductsModel=require('../../models/companyProducts');

var totalProducts = 0;
var pageSize = 8;
var pageCount = 0;
var start = 0;
var currentPage = 1;


//Get all product
router.get('/',(req,res)=>{
  ProductsModel.productCount(function(err,results) {
    if(err) throw err;
    totalProducts =results[0].count;
    pageCount = Math.ceil(totalProducts/pageSize);
    if (typeof req.query.page !== 'undefined') {
      currentPage = req.query.page;
    }

    if(parseInt(currentPage)==1){
      start=0;
    }
    if(parseInt(currentPage)>1){
        start=(currentPage - 1) * pageSize;
    }

    ProductsModel.getAllProductPaging({offset: start,limit : pageSize}, function(err,results){
      if(err){
        res.json(err);
      }else{
        res.render('client/components/products',{
            title: 'Home Product',
            totalProducts:totalProducts,       
            products: results, 
            pageCount: pageCount, 
            pageSize: pageSize, 
            currentPage: currentPage,
            title_product:'All product',
            meta_title:'all-product'
        });
      }
    });
});
});



//GET product by Category
router.get('/category/:category',(req,res)=>{
   var meta_title=req.params.category;
   CategoriesModel.findCategoryByMetatitle(meta_title,(err,result)=>{
       if(err){
           return console.log(err);
       }else{
        ProductsModel.productCountByCategory(result[0].name,function(err,results) {
            if(err) throw err;
            totalProducts =results[0].count;
            pageCount = Math.ceil(totalProducts/pageSize);
            if (typeof req.query.page !== 'undefined') {
              currentPage = req.query.page;
            }
        
            if(parseInt(currentPage)==1){
              start=0;
            }
            if(parseInt(currentPage)>1){
                start=(currentPage - 1) * pageSize;
            }
        
            ProductsModel.getAllProductByCategory(result[0].name,{offset: start,limit : pageSize}, function(err,results){
              if(err){
                res.json(err);
              }else{
                res.render('client/components/products',{
                    title: 'Category Product',
                    params: 'category',
                    totalProducts:totalProducts,       
                    products: results, 
                    pageCount: pageCount, 
                    pageSize: pageSize, 
                    currentPage: currentPage,
                    title_product:result[0].name,
                    meta_title:meta_title,
                });
              }
            });
        });
       }
   });
});


//GET product by productCompany
router.get('/producer/:company',(req,res)=>{
  var meta_title=req.params.company;
  CompanyProductsModel.findCompanyProductByMetatitle(meta_title,(err,result)=>{
      if(err){
          return console.log(err);
      }else{
       ProductsModel.productCountByCompany(result[0].name,function(err,results) {
           if(err) throw err;
           totalProducts =results[0].count;
           pageCount = Math.ceil(totalProducts/pageSize);
           if (typeof req.query.page !== 'undefined') {
             currentPage = req.query.page;
           }
       
           if(parseInt(currentPage)==1){
             start=0;
           }
           if(parseInt(currentPage)>1){
               start=(currentPage - 1) * pageSize;
           }
       
           ProductsModel.getAllProductByCompany(result[0].name,{offset: start,limit : pageSize}, function(err,results){
             if(err){
               res.json(err);
             }else{
               res.render('client/components/products',{
                   title: 'Producer Product',
                   params:'producer',
                   totalProducts:totalProducts,       
                   products: results, 
                   pageCount: pageCount, 
                   pageSize: pageSize, 
                   currentPage: currentPage,
                   title_product:result[0].name,
                   meta_title:meta_title
               });
             }
           });
       });
      }
  });
});

module.exports=router;