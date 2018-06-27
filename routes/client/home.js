var express=require('express');
var router=express.Router();

var ProductsModel=require('../../models/products');

//Lay 10 san phan ban chay ,nhieu luot xem ,moi nhat
router.get('/',(req,res)=>{
    ProductsModel.getLimitProduct().then(newProducts=>{
        ProductsModel.getProductTopView().then(topViewProducts=>{
            ProductsModel.getProductSalesBest().then(bestSellingProducts=>{
                res.render('client/components/home',{
                    title:'Home',
                    newProducts:newProducts,
                    topViewProducts:topViewProducts,
                    bestSellingProducts:bestSellingProducts
                });
            });
        });
                
    });
});


module.exports=router;