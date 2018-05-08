var express=require('express');
var router=express.Router();

var ProductModel=require('../../models/products');

//GET add cart
router.get('/add/:product',(req,res)=>{
    var meta_title=req.params.product;
    ProductModel.findProductByMetatitle(meta_title,(err,product)=>{
        if(err){
            return console.log(err);
        }
        if(typeof req.session.cart== "undefined"){
            req.session.cart=[];
            req.session.cart.push({
                meta_title:meta_title,
                qty:1,
                name:product[0].name,
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
                    price:parseFloat(product[0].price).toFixed(2),
                    image:'/admin/images/product_images/product'+ product[0].id + '/' + product[0].image
                });
            }
        }
        req.flash('success','Product addes');
        res.redirect('back');
    });
});

//GET checkout page

router.get('/checkout',(req,res)=>{
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

//GET Clear cart
router.get('/clear',(req,res)=>{
    delete req.session.cart;
    res.redirect('/cart/checkout');
});



module.exports=router;