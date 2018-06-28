var express=require('express');
var router=express.Router();

var auth=require('../../config/auth');
var isAdmin=auth.isAdmin;

var BillProductModel=require('../../models/billProducts');
var totalBills = 0;
var pageSize = 4;
var pageCount = 0;
var start = 0;
var currentPage = 1;

//GET tat ca danh sach don hang
router.get('/',isAdmin,(req,res)=>{
    if(req.session.errors){
      req.session.errors=null;
    }
    BillProductModel.billProductCount().then(results=>{
        totalBills =results[0].count;
        pageCount = Math.ceil(totalBills/pageSize);
        if (typeof req.query.page !== 'undefined') {
          currentPage = req.query.page;
        }
    
        if(parseInt(currentPage)==1){
          start=0;
        }
        if(parseInt(currentPage)>1){
            start=(currentPage - 1) * pageSize;
        }
    
        BillProductModel.getAllBillProductPaging(start,pageSize).then(results=>{
            res.render('admin/components/billProducts/homeBillProducts',{
                title: 'Home User',
                totalBills:totalBills,       
                bills: results, 
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

//GET edit user
router.get('/edit-bill/:id',isAdmin,(req,res)=>{
  var errors;
  if(req.session.errors){
    errors=req.session.errors;
  }else{
    req.session.errors=null;
  }
  BillProductModel.getBillProductById(req.params.id).then(bill=>{
      res.render('admin/components/billProducts/editBillProducts',{
              title  :'Edit Bill',
              id:bill[0].id,
              errors :errors,
              bill:bill,
              status:bill[0].status,
            });
          }).catch(err=>{
            console.log(err);
            res.redirect('/admin/billproducts');
          })
})
     
router.post('/edit-bill/:id',(req,res)=>{
  var id=req.params.id;
  var status=0;
  var checkbox=req.body.status;
  if(checkbox){
    status=1;
  }else{
    status=0;
  }
    var bill={
      "status":status
    };
    BillProductModel.updateBillByManager(bill,id).then(bill=>{
      req.flash('success','Bill update success');
      res.redirect('/admin/billproducts');
    }).catch(err=>{
      console.log(err);
    });
});


//Delete user
router.get('/delete-user/:id',isAdmin,(req,res)=>{
  var id=req.params.id;
  UserModel.deleteUser(id).then(result=>{
    req.flash('success','User deleted');
    res.redirect('/admin/users');
  }).catch(err=>{
      console.log(err);
  })
});
module.exports=router;
