var express=require('express');
var router=express.Router();
var mkdirp=require('mkdirp');
var fs=require('fs-extra');
var resizeImg=require('resize-img');
var dateTime=require('node-datetime');


var ProductsModel=require('../../models/products');
var CategoriesModel=require('../../models/categories');
var CompanyProductsModel=require('../../models/companyProducts');
var strHelper=require('../../helper/strReplace');

var auth=require('../../config/auth');
var isAdmin=auth.isAdmin;


//Pagination
var totalProducts = 0;
var pageSize = 4;
var pageCount = 0;
var start = 0;
var currentPage = 1;

//GET Product Home
router.get('/',isAdmin,(req,res)=>{
    if(req.session.errors){
      req.session.errors=null;
    }
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
            res.render('admin/components/products/homeProducts',{
                title: 'Home Product',
                totalProducts:totalProducts,       
                products: results, 
                pageCount: pageCount, 
                pageSize: pageSize, 
                currentPage: currentPage
            });
          }).catch(err=>{
            console.log(err);
          })
        }).catch(err=>{
          console.log(err);
        })
});


//GET add product
router.get('/add-product',isAdmin,(req,res)=>{
  var errors;
  if(req.session.errors){
    errors=req.session.errors;
  }else{
    req.session.errors=null;
  }
  CategoriesModel.getAllCategory().then(categories=>{
      CompanyProductsModel.getAllCompanyProduct().then(companyProducts=>{
          res.render('admin/components/products/addProducts',{
            title:'Add product',
            errors:errors,
            categories:categories,
            companyProducts:companyProducts
          });
        }).catch(err=>{
          console.log(err);
        })
      }).catch(err=>{
        console.log(err);
      })
});

//POST add product
router.post('/add-product',(req,res)=>{
  var imageFile= typeof req.files.image !== "undefined" ? req.files.image.name : "";
  req.checkBody('name','Name must has a value').notEmpty();
  req.checkBody('display_order','Display order must has a value').notEmpty();
  req.checkBody('description','Description must has a value').notEmpty();
  req.checkBody('price','Price order must has a value').isDecimal();
  req.checkBody('quantity','Quantity by must has a value').notEmpty();
  req.checkBody('created_by','Created by must has a value').notEmpty();
  req.checkBody('image','You must upload an image').isImage(imageFile);



  var name=req.body.name;
  var meta_title=strHelper.myReplace(name);
  var parent_category=req.body.category;
  var parent_company=req.body.company_product;
  var display_order=req.body.display_order;
  var description=req.body.description;
  var price=req.body.price;
  var quantity=req.body.quantity;
  var created_by=req.body.created_by;
  //datetime
  var dt = dateTime.create();
  var date = dt.format('Y-m-d H:M:S');
  var created_date=date;


  var errors=req.validationErrors();
  if(errors){
    req.session.errors=errors;
    res.redirect('/admin/product/add-product');
  }else{
      ProductsModel.findProductByMetatitle(meta_title).then(results=>{
          if(results.length>0){
              req.flash('danger','Product already exists');
              res.redirect('/admin/product/add-product');
          }else{
              var priceFormat=parseFloat(price).toFixed(2);
              var product={
                  "name"            :name,
                  "meta_title"      :meta_title,
                  "parent_category" :parent_category,
                  "parent_company"  :parent_company,
                  "display_order"   :display_order,
                  "description"     :description,
                  "price"           :priceFormat,
                  "image"           :imageFile,
                  "quantity"        :quantity,
                  "created_date"    :created_date,
                  "created_by"      :created_by
              };

              ProductsModel.addProduct(product).then(result=>{
                    mkdirp('public/admin/images/product_images/product'+result.insertId,(err)=>{
                        return console.log(err);
                    });
                    if(imageFile != null){
                      var productImage=req.files.image;
                      var path='public/admin/images/product_images/product'+result.insertId+'/'+imageFile;

                      productImage.mv(path,(err)=>{
                        return console.log(err);
                      });
                    }         
                    req.flash('success','Product added success');
                    res.redirect('/admin/product');
                  }).catch(err=>{
                    console.log(err);
                  })
                }

              }).catch(err=>{
                console.log(err);
              })
          }
});

//GET product edit
router.get('/edit-product/:id',isAdmin,(req,res)=>{
  var errors;
  if(req.session.errors){
    errors=req.session.errors;
  }else{
    req.session.errors=null;
  }

  CategoriesModel.getAllCategory().then(categories=>{
      CompanyProductsModel.getAllCompanyProduct().then(companyProducts=>{
          ProductsModel.getProductById(req.params.id).then(results=>{
            res.render('admin/components/products/editProducts',{
              title               :'Add product',
              errors              :errors,
              id                  :results[0].id,
              name                :results[0].name,
              display_order       :results[0].display_order,
              description         :results[0].description,
              price               :results[0].price,
              image               :results[0].image,
              quantity            :results[0].quantity,
              modified_by         :results[0].modified_by,
              nameCategory        :results[0].parent_category,
              nameCompanyProduct  :results[0].parent_company,
              categories          :categories,
              companyProducts     :companyProducts
            });
          }).catch(err=>{
            console.log(err);
            res.redirect('/admin/product');
          })
        }).catch(err=>{
          console.log(err);
        })
      }).catch(err=>{
        console.log(err);
      })
});

//POST edit product
router.post('/edit-product/:id',(req,res)=>{
  var imageFile= typeof req.files.image !== "undefined" ? req.files.image.name : "";
  req.checkBody('name','Name must has a value').notEmpty();
  req.checkBody('display_order','Display order must has a value').notEmpty();
  req.checkBody('description','Description must has a value').notEmpty();
  req.checkBody('price','Price order must has a value').isDecimal();
  req.checkBody('quantity','Quantity by must has a value').notEmpty();
  req.checkBody('modified_by','Modified by must has a value').notEmpty();
  req.checkBody('image','You must upload an image').isImage(imageFile);

  var id=req.params.id;
  var name=req.body.name;
  var meta_title=strHelper.myReplace(name);
  var parent_category=req.body.category;
  var parent_company=req.body.company_product;
  var display_order=req.body.display_order;
  var description=req.body.description;
  var price=req.body.price;
  var quantity=req.body.quantity;
  var modified_by=req.body.modified_by;


  //datetime
  var dt = dateTime.create();
  var date = dt.format('Y-m-d H:M:S');
  var modified_date=date;

  
  
  var errors=req.validationErrors();
  if(errors){
      req.session.errors=errors;
      res.redirect('/admin/product/edit-product/'+id);
  }else{
      ProductsModel.findProductByMetatitleOtherId(id,meta_title).then(results=>{
          if(results.length>0){
            req.flash('danger','CompanyProduct already exists');
            res.redirect('/admin/product/edit-product/'+id);
          }else{
            var priceFormat=parseFloat(price).toFixed(2);
            var product={
                "name"            :name,
                "meta_title"      :meta_title,
                "parent_category" :parent_category,
                "parent_company"  :parent_company,
                "display_order"   :display_order,
                "description"     :description,
                "price"           :priceFormat,
                "image"           :imageFile,
                "quantity"        :quantity,
                "modified_date"   :modified_date,
                "modified_by"     :modified_by
            };

            ProductsModel.updateProduct(id,product).then(result=>{
                  mkdirp('public/admin/images/product_images/product'+id,(err)=>{
                      return console.log(err);
                  });
                  if(imageFile != null){
                    console.log(imageFile);
                    var productImage=req.files.image;
                    var path='public/admin/images/product_images/product'+ id +'/'+ imageFile;

                    productImage.mv(path,(err)=>{
                      return console.log(err);
                    });
                  }         
                  req.flash('success','Product update success');
                  res.redirect('/admin/product');
                }).catch(err=>{
                  console.log(err);
                })
              }

            }).catch(err=>{
              console.log(err);
            })
          }
});

//GET delete product

router.get('/delete-product/:id',isAdmin,(req,res)=>{
  var id=req.params.id;
  var path='public/admin/images/product_images/product'+id;
  fs.remove(path,(err)=>{
    if(err) {console.log(err);}
    else {
      ProductsModel.deleteProduct(id).then(result=>{
          req.flash('success','Producted deleted');
          res.redirect('/admin/product');
        }).catch(err=>{
          console.log(err);
        })
      }
    });
});
module.exports=router;

