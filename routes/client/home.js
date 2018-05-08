var express=require('express');
var router=express.Router();


var ProductsModel=require('../../models/products');


router.get('/',(req,res)=>{

    ProductsModel.getLimitProduct((err,newProducts)=>{
        if(err){
            return console.log(err);
        }else{
            ProductsModel.getProductTopView((err,topViewProducts)=>{
                if(err){
                    return console.log(err);
                }else{
                    ProductsModel.getProductSalesBest((err,bestSellingProducts)=>{
                        if(err){
                            return console.log(err);
                        }else{
                            res.render('client/components/home',{
                                title:'Home',
                                newProducts:newProducts,
                                topViewProducts:topViewProducts,
                                bestSellingProducts:bestSellingProducts
                            });
                        }
                    });
                }
            });
        }
    });
});


module.exports=router;