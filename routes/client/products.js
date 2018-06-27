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
  ProductsModel.productCount().then(results=>{
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

    ProductsModel.getAllProductPaging(start,pageSize).then(results=>{
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
      });
    });
});



//GET product by Category
router.get('/loai-san-pham/:category',(req,res)=>{
   var meta_title=req.params.category;
   CategoriesModel.findCategoryByMetatitle(meta_title).then(result=>{
        if(result.length>0)
        {
          ProductsModel.productCountByCategory(result[0].name).then(results=>{
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
              ProductsModel.getAllProductByCategory(result[0].name,start,pageSize).then(results=>{
                  res.render('client/components/products',{
                      title: 'Category Product',
                      params: 'loai-san-pham',
                      totalProducts:totalProducts,       
                      products: results, 
                      pageCount: pageCount, 
                      pageSize: pageSize, 
                      currentPage: currentPage,
                      title_product:result[0].name,
                      meta_title:meta_title,
                  });
                });
              });
            }
            else{
              return console.log('No found');
            }
        });
});


//GET product by productCompany
router.get('/nha-san-xuat/:company',(req,res)=>{
  var meta_title=req.params.company;
  CompanyProductsModel.findCompanyProductByMetatitle(meta_title).then(result=>{
       ProductsModel.productCountByCompany(result[0].name).then(result1=>{
           console.log(result1[0].count);
           console.log(result);
           totalProducts =result1[0].count;
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
       
           ProductsModel.getAllProductByCompany(result[0].name, start,pageSize).then(results=>{
               res.render('client/components/products',{
                   title: 'Producer Product',
                   params:'nha-san-xuat',
                   totalProducts:totalProducts,       
                   products: results, 
                   pageCount: pageCount, 
                   pageSize: pageSize, 
                   currentPage: currentPage,
                   title_product:result[0].name,
                   meta_title:meta_title
               });
             });
           });
       });
});

//GET search
router.get('/search',(req,res)=>{
  var search='%'+req.query.search+'%';
  ProductsModel.searchProductAndGetCount(search).then(result=>{
    totalProducts =result[0].count;
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

    ProductsModel.getAllProductByKeySearch(search,start,pageSize).then(results=>{
        res.render('client/components/products',{
            title: 'Home Product',
            totalProducts:totalProducts,       
            products: results, 
            pageCount: pageCount, 
            pageSize: pageSize, 
            currentPage: currentPage,
            title_product:'Search product by '+ req.query.search,
            meta_title:'all-product'
        });
      });
    });
});
module.exports=router;