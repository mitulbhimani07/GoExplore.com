const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const imgPath = '/uploads/User';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobailNambar : {
        type: String,
        required: true,
    },
    // image: {
    //     type: String,
    //     required: true,
    // },
}, {
    timestamps: true,
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '..', '..', imgPath));
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// UserSchema.statics.StoreImageUploads = multer({ storage: storage }).single('image');
// UserSchema.statics.imagePath = imgPath;

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = UserModel;