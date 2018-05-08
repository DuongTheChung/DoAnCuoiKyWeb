var express=require('express');
var router=express.Router();

var ProductModels =require('../../models/products');
var CategoryModels=require('../../models/categories');
var CompanyModels=require('../../models/companyProducts');

router.get('/:product',(req,res)=>{

    var meta_title=req.params.product;
    ProductModels.findProductByMetatitle(meta_title,(err,product)=>{
        if(err){
            return console.log(err);
        }else{
            CategoryModels.findCategoryByName(product[0].parent_category,(err,category)=>{
                if(err){
                    return console.log(err);
                }else{

                    CompanyModels.findCompanyProductByName(product[0].parent_company,(err,company)=>{
                        if(err){
                            return console.log(err);
                        }else{
                            ProductModels.getProductSameCategoryLimit(product[0].parent_category,product[0].name,(err,sameProducts)=>{
                                if(err){
                                    return console.log(err);
                                }else{
                                    ProductModels.getProductSameCompanyLimit(product[0].parent_company,
                                        product[0].name,(err,sameCompanyProduct)=>{
                                            if(err){
                                                return console.log(err);
                                            }else{
                                                res.render('client/components/single',{
                                                    title:'Product',
                                                    product:product[0],
                                                    category:category[0],
                                                    company:company[0],
                                                    sameCompanyProduct:sameCompanyProduct,
                                                    sameProducts:sameProducts
                                                });
                                            }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});
    



module.exports=router;