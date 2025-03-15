const express = require('express');
const routes = express.Router();
const AdminController = require('../controller/AdminController');
const AdminModel = require('../model/GoExplore.AdminModel/AdminModel')
const passport = require('passport');

// registrayion
routes.post('/',AdminController.registrationAdmin)
// Sign in 
routes.post('/AdminSignin',AdminController.signin)
// routes.get('/Profile',passport.authenticate('jwt',{failureRedirect:'/Admin/adminFailLogin'}),AdminController.profile)
routes.get('/Profile',AdminController.profile);
// view Admin
routes.get('/ViewAdmin',AdminController.ViewAdmin);
// Update Admin
routes.put('/UpdateAdmin/:id', AdminController.updateAdmin);
//admin logout
routes.get('/AdminLogout',AdminController.adminLogout);
//change admin Password
routes.post('/changeAdminPassword',passport.authenticate('jwt',{failureRedirect:'/Admin/adminFailLogin'}),AdminController.changeAdminPassword);
//forget password
routes.post('/sendEmail',AdminController.sendEmail);
routes.post('/forgetPassword',AdminController.forgetPassword);

//fail Login 
routes.get('/adminFailLogin',async(req,res)=>{
    try{
        res.status(200).json({msg:"Admin Failed Login.."});
    }
    catch(err){
        res.status(400).json({msg:"Something is wrong",error:err});
    }
})
module.exports = routes