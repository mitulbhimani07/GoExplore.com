const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const imgPath = '/uploads/Admin';

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        default: null
    },
}, {
    timestamps: true
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', imgPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

AdminSchema.statics.StoreImageUploads = multer({ storage: storage }).single('image');
AdminSchema.statics.imagePath = imgPath;

const AdminData = mongoose.model('AdminData', AdminSchema);
module.exports = AdminData;