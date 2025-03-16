require('dotenv').config(); // Load environment variables

const UserModel = require('../model/GoExplore.UserModel/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

module.exports.registrationUser = async (req, res) => {
  try {
    console.log(req.body);
    let existingAdmin = await UserModel.findOne({ email: req.body.email });
    if (!existingAdmin) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      let UserData = await UserModel.create(req.body);
      return res.status(200).json({ message: "User Register Successful", UserData });
    } else {
      return res.status(400).json({ message: "Email already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports.signin = [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let signinUser = await UserModel.findOne({ email: req.body.email });
      if (!signinUser) {
        return res.status(400).json({ message: "Invalid Email" });
      }

      let isMatch = await bcrypt.compare(req.body.password, signinUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Password" });
      }

      signinUser = signinUser.toObject();
      delete signinUser.password;
      let token = generateToken(signinUser._id);

      return res.status(200).json({ message: "User Signin Successful", token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }
];

module.exports.profile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User found', data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err: 'Sorry, error' });
  }
};

module.exports.UserLogout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(200).json({ msg: "something is wrong.." });
      } else {
        res.status(200).json({ msg: "User Logout successfully.." });
      }
    });
  } catch (err) {
    res.status(400).json({ msg: "something is wrong..", error: err });
  }
};

module.exports.sendEmail = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'mitulbhimani281@gmail.com',
          pass: 'ewuzytezzsrwkdzw',
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const otp = Math.round(Math.random() * 1000000);

      const info = await transporter.sendMail({
        from: 'mitulbhimani281@gmail.com',
        to: req.body.email,
        subject: 'OTP Verification',
        text: 'Forget password',
        html: `<b>Otp: ${otp}</b>`,
      });

      const data = {
        email: req.body.email,
        otp,
      };

      if (info) {
        res.status(200).json({ msg: 'Send Mail..please check your mail', data });
      } else {
        res.status(200).json({ msg: 'Mail not sent', data: info });
      }
    } else {
      res.status(200).json({ msg: 'Invalid Email' });
    }
  } catch (err) {
    res.status(400).json({ msg: 'Something is wrong..', error: err });
  }
};

module.exports.forgetPassword = async (req, res) => {
  try {
    let checkEmail = await UserModel.findOne({ email: req.query.email });
    if (checkEmail) {
      if (req.body.newPass == req.body.confirmPass) {
        req.body.password = await bcrypt.hash(req.body.newPass, 10);
        let updatePassword = await UserModel.findByIdAndUpdate(checkEmail._id, req.body);
        if (updatePassword) {
          res.status(200).json({ msg: "password updated successfully", data: updatePassword });
        } else {
          res.status(200).json({ msg: "Password not updated" });
        }
      } else {
        res.status(200).json({ msg: "new Password and confirm password not matched" });
      }
    } else {
      res.status(200).json({ msg: "Invalid Email" });
    }
  } catch (err) {
    res.status(400).json({ msg: "something is wrong..", error: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Something is wrong', error: err });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: 'User updated successfully', data: user });
  } catch (err) {
    res.status(500).json({ msg: 'Something is wrong', error: err });
  }
};