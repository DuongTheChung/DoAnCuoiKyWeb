var express=require('express');
var router=express.Router();

var auth=require('../../config/auth');
var isAdmin=auth.isAdmin;


var UserModel=require('../../models/users');
var RoleUserModel=require('../../models/roleUsers');
var totalUsers = 0;
var pageSize = 4;
var pageCount = 0;
var start = 0;
var currentPage = 1;

router.get('/',isAdmin,(req,res)=>{
    if(req.session.errors){
      req.session.errors=null;
    }
    UserModel.userCount().then(results=>{
        totalUsers =results[0].count;
        pageCount = Math.ceil(totalUsers/pageSize);
        if (typeof req.query.page !== 'undefined') {
          currentPage = req.query.page;
        }
    
        if(parseInt(currentPage)==1){
          start=0;
        }
        if(parseInt(currentPage)>1){
            start=(currentPage - 1) * pageSize;
        }
    
        UserModel.getAllUserPaging(start,pageSize).then(results=>{
            res.render('admin/components/users/homeUsers',{
                title: 'Home User',
                totalUsers:totalUsers,       
                users: results, 
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
router.get('/edit-user/:id',isAdmin,(req,res)=>{
  var errors;
  if(req.session.errors){
    errors=req.session.errors;
  }else{
    req.session.errors=null;
  }
  RoleUserModel.getAllRoleUser().then(roles=>{
    UserModel.findUserById(req.params.id).then(user=>{
      res.render('admin/components/users/editUsers',{
              title  :'Edit user',
              id:user[0].id,
              errors :errors,
              roles:roles,
              username:user[0].username,
              status:user[0].status,
              roleName:user[0].name
            });
          }).catch(err=>{
            console.log(err);
            res.redirect('/admin/users');
          })
        }).catch(err=>{
          console.log(err);
        })
});
     
router.post('/edit-user/:id',(req,res)=>{
  var id=req.params.id;
  var role=req.body.role;
  var status=0;
  var checkbox=req.body.status;
  if(checkbox){
    status=1;
  }else{
    status=0;
  }

  console.log(role);
  RoleUserModel.getIdRoleUserByName(role).then(result=>{
    var user={
      "roleId":result[0].id,
      "status":status
    };
    UserModel.updateUserByManager(user,id).then(user=>{
      req.flash('success','User update success');
      res.redirect('/admin/users');
    }).catch(err=>{
      console.log(err);
    });
  }).catch(err=>{
    console.log(err);
  })
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
