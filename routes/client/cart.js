var express=require('express');
var dateTime=require('node-datetime');
var auth=require('../../config/auth');
var isUser=auth.isUser;

var router=express.Router();

var ProductModel=require('../../models/products');
var BillProductModel=require('../../models/billProducts');

//GET add cart
router.get('/add/:product',(req,res)=>{
    var meta_title=req.params.product;
    ProductModel.findProductByMetatitle(meta_title).then(product=>{
        if(typeof req.session.cart== "undefined"){
            req.session.cart=[];
            req.session.cart.push({
                meta_title:meta_title,
                qty:1,
                name:product[0].name,
                parent_company:product[0].parent_company,
                parent_category:product[0].parent_category,
                description:product[0].description,
                price:parseFloat(product[0].price).toFixed(2),
                image:'/admin/images/product_images/product'+ product[0].id + '/' + product[0].image
            });
        }else{
            var cart=req.session.cart;
            var newItem=true;
            for(var i=0;i<cart.lengthl;i++){
                if(cart[i].meta_title==meta_title){
                    cart[i].quantity++;
                    newItem=false;
                    break;
                }
            }

            if(newItem){
                cart.push({
                    meta_title:meta_title,
                    qty:1,
                    name:product[0].name,
                    description:product[0].description,
                    parent_company:product[0].parent_company,
                    parent_category:product[0].parent_category,
                    price:parseFloat(product[0].price).toFixed(2),
                    image:'/admin/images/product_images/product'+ product[0].id + '/' + product[0].image
                });
            }
        }
        req.flash('success','Product addes');
        res.redirect('/cart/checkout');
    });
});

//GET checkout page

router.get('/checkout',isUser,(req,res)=>{
    if(req.session.cart && req.session.cart.length==0){
        delete req.session.cart;
        res.redirect('/cart/checkout');
    }
    else{
        res.render('client/components/checkout',{
            title:'Checkout',
            cart:req.session.cart
        });
    }
});


//GET update cart

router.get('/update/:product',(req,res)=>{
    var meta_title=req.params.product;
    var cart=req.session.cart;
    var action=req.query.action;

    for(var i=0;i<cart.length;i++){
        if(cart[i].meta_title==meta_title){
            switch(action){
                case "add":
                    cart[i].qty++;
                    break;
                case "remove":
                    cart[i].qty--;
                    if(cart[i].qty<1){
                        cart.splice(i,1);
                    }
                    break;
                case "clear":
                    cart.splice(i,1);
                    if(cart.length==0){
                        delete req.session.cart;
                    }
                    break;
                default:
                    console.log('update problem');
                    break;                

            }
            break;
        }
    }
    res.redirect('/cart/checkout');
});

//Buy cart
router.get('/buy',(req,res)=>{
    var cart=req.session.cart;
    for(var i=0;i<cart.length;i++){
        var userId=res.locals.user[0].id;
        var meta_title=cart[i].meta_title;
        var product_name=cart[i].name;
        var category_name=cart[i].parent_category;
        var company_name=cart[i].parent_company;
        var quantity=cart[i].qty;
        var total_price=cart[i].price*quantity;

        var dt = dateTime.create();
        var date = dt.format('Y-m-d H:M:S');
        var created_date=date;
      
        var billProduct={
            "userId":userId,
            "product_name":product_name,
            "category_name":category_name,
            "company_name":company_name,
            "quantity":quantity,
            "total_price":total_price,
            "created_date":created_date
        }
        BillProductModel.addBillProduct(billProduct).then(result=>{
            ProductModel.findProductByMetatitle(meta_title).then(product=>{
                var quantity_update=product[0].quantity-quantity;
                ProductModel.updateQuantityProduct(product[0].id,quantity_update).then(product1=>{
                    var salesCountUpdate=product[0].sales_count+quantity;
                    ProductModel.updateSalesCountProduct(product[0].id,salesCountUpdate).then(result2=>{
                      
                    });      
                });
            });
        });
    }
    req.flash('success','Buy success');
    delete req.session.cart;
    res.redirect('/cart/checkout');
});

//GET Clear cart
router.get('/clear',(req,res)=>{
    delete req.session.cart;
    res.redirect('/cart/checkout');
});



module.exports=router;