var express=require('express');
var router=express.Router();

var ProductModels =require('../../models/products');
var CategoryModels=require('../../models/categories');
var CompanyModels=require('../../models/companyProducts');

router.get('/:product',(req,res)=>{
    var loggedIn=(req.isAuthenticated()) ? true:false
    var meta_title=req.params.product;
    ProductModels.findProductByMetatitle(meta_title).then(product=>{
        var count=product[0].view_count+1;
        ProductModels.updateViewCountProduct(product[0].id,count).then(p=>{
            CategoryModels.findCategoryByName(product[0].parent_category).then(category=>{
                CompanyModels.findCompanyProductByName(product[0].parent_company).then(company=>{
                    ProductModels.getProductSameCategoryLimit(product[0].parent_category,product[0].name).then(sameProducts=>{
                        ProductModels.getProductSameCompanyLimit(product[0].parent_company,product[0].name).then(sameCompanyProduct=>{
                            res.render('client/components/single',{
                                title:'Product',
                                loggedIn:loggedIn,
                                product:product[0],
                                category:category[0],
                                company:company[0],
                                sameCompanyProduct:sameCompanyProduct,
                                sameProducts:sameProducts
                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports=router;