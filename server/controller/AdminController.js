const AdminModel = require('../model/GoExplore.AdminModel/AdminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const nodemailer=require('nodemailer');
const { check, validationResult } = require('express-validator');

//Admin Register
module.exports.registrationAdmin = [
    // Validation rules
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password and Confirm Password must match');
        }
        return true;
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // let imagenewpath = '';
            // if (req.file) {
            //     imagenewpath = AdminModel.imagePath + "/" + req.file.filename;
            // }
            // req.body.image = imagenewpath;
            const existingAdmin = await AdminModel.findOne({ email: req.body.email });

            if (!existingAdmin) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                let AdminRegister = await AdminModel.create(req.body);
                return res.status(200).json({ message: "Admin Register Successful", AdminRegister });
            } else {
                return res.status(400).json({ message: "Email already exists" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Server error' });
        }
    }
];

// Admin Signin
module.exports.signin = [
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').notEmpty().withMessage('Password is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let signinAdmin = await AdminModel.findOne({ email: req.body.email });
            if (!signinAdmin) {
                return res.status(400).json({ message: "Invalid Email" });
            }

            let isMatch = await bcrypt.compare(req.body.password, signinAdmin.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid Password" });
            }

            signinAdmin = signinAdmin.toObject();
            delete signinAdmin.password;
            let token = await jwt.sign({ AdminRegister: signinAdmin }, "AdminAPI", { expiresIn: "1d" });

            return res.status(200).json({ message: "Admin Signin Successful", token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: "Something went wrong" });
        }
    }
];

//Admin Profile
module.exports.profile = async (req, res) => {
    try {
        const profile = await AdminModel.findById(req.user.id);
        if (!profile) {
            return res.status(404).json({ message: "Profile Not Found" });
        }
        res.status(200).json({ message: "Profile Found", data: profile });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, err: "Sorry, error" });
    }
};

//Admin view
module.exports.ViewAdmin = async(req,res)=>{
    try{
        const ViewAdmin = await AdminModel.find();
        res.status(200).json({message:"View Admin Found",data:ViewAdmin});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success: false, err: 'Sorry, error'})
    }
}
// Admin Update
module.exports.updateAdmin = async (req, res) => {
    try {
        let checkAdmin = await AdminModel.findById(req.params.id)
        if (checkAdmin) {
            let updateAdmin = await AdminModel.findByIdAndUpdate(req.params.id,req.body)
            if (updateAdmin) {
                let updateAdminData = await AdminModel.findById(req.params.id)
                res.status(200).json({msg:"Admin Updated successfully",updateAdminData}); 
            } else {
                res.status(200).json({msg:"Admin Not Updated"}); 
            }
        } else {
            res.status(200).json({msg:"Invalid email"});
        }
    } catch (error) {
        res.status(400).json({msg:"something is wrong..",error:err});
    }
};
//admin Logout
module.exports.adminLogout=async(req,res)=>{
    try{
        req.session.destroy((err)=>{
            if(err){
                res.status(200).json({msg:"something is wrong.."});
            }
            else{
                res.status(200).json({msg:"Admin Logout successfully.."});
            }
        })
    }
    catch(err){
        res.status(400).json({msg:"something is wrong..",error:err});
    }
}
//change password
module.exports.changeAdminPassword = [
    check('currentPass').notEmpty().withMessage('Current password is required'),
    check('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error('New Password and Confirm Password must match');
        }
        return true;
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let checkAdminPassword = await bcrypt.compare(req.body.currentPass, req.user.password);
            if (!checkAdminPassword) {
                return res.status(400).json({ msg: "Current password not matched." });
            }

            req.body.password = await bcrypt.hash(req.body.newPassword, 10);
            let updatePassword = await AdminModel.findByIdAndUpdate(req.user._id, req.body);
            if (updatePassword) {
                let updateAdminPassword = await AdminModel.findById(req.user._id);
                return res.status(200).json({ msg: "Password Updated successfully", updateAdminPassword });
            } else {
                return res.status(400).json({ msg: "Password not updated" });
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json({ msg: "Something is wrong", error: err });
        }
    }
];

//forget password
module.exports.sendEmail=async(req,res)=>{
    try{
        let checkEmail=await AdminModel.findOne({email:req.body.email});
        if(checkEmail){
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                  user: "mitulbhimani281@gmail.com",
                  pass: "ewuzytezzsrwkdzw",
                },
                tls:{
                    rejectUnauthorized:false
                }
            });

            let otp=Math.round(Math.random()*1000000);

            const info = await transporter.sendMail({
                from: 'mitulbhimani281@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "OTP Verification", // Subject line
                text: "forget password", // plain text body
                html: `<b>Otp:${otp}</b>`, // html body
            });

            let data={
                email:req.body.email,otp
            }
            if(info){
                res.status(200).json({msg:"send Mail..please check your mail",data:data});
            }else{
                res.status(200).json({msg:"mail not sent",data:info});
            }
        }
        else{
            res.status(200).json({msg:"Invalid Email"});
        }
    }
    catch(err){
        res.status(400).json({msg:"something is wrong..",error:err});
    }
}

module.exports.forgetPassword=async(req,res)=>{
    try{
        let checkEmail=await AdminModel.findOne({email:req.query.email});
        if(checkEmail){
            if(req.body.newPass==req.body.confirmPass){
                req.body.password=await bcrypt.hash(req.body.newPass,10);
                let updatePassword=await AdminModel.findByIdAndUpdate(checkEmail._id,req.body);
                if(updatePassword){
                    res.status(200).json({msg:"password updated successfully",data:updatePassword});
                }
                else{
                    res.status(200).json({msg:"Password not updated"});
                }
            }
            else{
                res.status(200).json({msg:"new Password and confirm password not matched"});
            }
        }else{
            res.status(200).json({msg:"Invalid Email"});
        }
    }
    catch(err){
        res.status(400).json({msg:"something is wrong..",error:err});
    }
}