var express=require('express');
var router=express.Router();

var ProductsModel=require('../../models/products');
var CategoriesModel=require('../../models/categories');
var CompanyProductsModel=require('../../models/companyProducts');


var totalProducts = 0;
var pageSize = 4;
var pageCount = 0;
var start = 0;
var currentPage = 1;



//Get all product
router.get('/all-product',(req,res)=>{
  var loggedIn=(req.isAuthenticated()) ? true:false
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
            title: 'All Product',
            params:"all-product",
            loggedIn:loggedIn,
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
  var loggedIn=(req.isAuthenticated()) ? true:false
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
                      loggedIn:loggedIn,
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
  var loggedIn=(req.isAuthenticated()) ? true:false
  var meta_title=req.params.company;
  CompanyProductsModel.findCompanyProductByMetatitle(meta_title).then(result=>{
       ProductsModel.productCountByCompany(result[0].name).then(result1=>{
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
                   loggedIn:loggedIn,
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

//GET search theo ten 
router.get('/search',(req,res)=>{
  var loggedIn=(req.isAuthenticated()) ? true:false
  var text=req.url;
  var str="";
  var start=text.indexOf("=");
  var end=text.indexOf("/",1);
  if(end==-1){
    str=req.query.search;
  }else{
    str=text.slice(start+1,end);
  } 

  var params='search?search='+str;
  var search='%'+str+'%';
  ProductsModel.searchProductAndGetCount(search).then(result=>{
    totalProducts =result[0].count;
    pageCount = Math.ceil(totalProducts/pageSize);
    if (text.indexOf("page") != -1) {
      currentPage = text.slice(text.indexOf("page")+5,text.length);
    }

    if(parseInt(currentPage)==1){
      start=0;
    }
    if(parseInt(currentPage)>1){
        start=(currentPage - 1) * pageSize;
    }

    ProductsModel.getAllProductByKeySearch(search,start,pageSize).then(results=>{
        res.render('client/components/products',{
            title: 'Search Product',
            params:params,
            loggedIn:loggedIn,
            totalProducts:totalProducts,       
            products: results, 
            pageCount: pageCount, 
            pageSize: pageSize, 
            currentPage: currentPage,
            title_product:'Search product by '+ str,
            meta_title:'search-name'
        });
      });
    });
});

function searchProductFromPrice(minPrice,maxPrice,req,res){
    var loggedIn=(req.isAuthenticated()) ? true:false
    ProductsModel.searchProductByPriceAndGetCount(minPrice,maxPrice).then(result=>{
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

    ProductsModel.getAllProductFromPriceSearch(minPrice,maxPrice,start,pageSize).then(results=>{
        res.render('client/components/products',{
            title: 'Search Product',
            params:'search-price',
            loggedIn:loggedIn,
            totalProducts:totalProducts,       
            products: results, 
            pageCount: pageCount, 
            pageSize: pageSize, 
            currentPage: currentPage,
            title_product:'Search product from '+minPrice+'$-'+maxPrice+'$',
            meta_title:minPrice+'-'+maxPrice
        });
      }).catch(err=>{
        console.log(err);
      })
    }).catch(err=>{
      console.log(err);
    })
}
//Search theo gia
router.get('/search-price/:price',(req,res)=>{
  var price=req.params.price;
  switch(price){
    case "50-150":
      searchProductFromPrice(50.00,150.00,req,res);
      break;
    case "150-250":
      searchProductFromPrice(150.00,250.00,req,res);
      break;
    case "250-350":
      searchProductFromPrice(250.00,350.00,req,res);
      break;
    case "350-450":
      searchProductFromPrice(350.00,450.00,req,res);
      break;
  }
});
module.exports=router;