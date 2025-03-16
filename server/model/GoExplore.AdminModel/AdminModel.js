const mongoose = require('mongoose');
// const multer = require('multer');
// const imgPath = '/uploads';
// const path = require('path')
const AdminScheema = mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    // image : {
    //     type : String,
    //     required : true
    // },
    mobile : {
        type : Number,
        default : null
    },  
},{
    timestamps : true
})

// const StoreImage = multer.diskStorage({
//     destination : (req,file,cb)=>{
//         cb(null,path.join(__dirname,'..',imgPath));
//     },
//     filename : (req,file,cb)=>{
//         cb(null,file.fieldname+'-'+Date.now())
//     }
// })

// AdminScheema.statics.StoreImageUploads = multer({storage:StoreImage}).single('image');
// AdminScheema.statics.imagePath = imgPath;

const AdminData = mongoose.model('AdminData',AdminScheema);
module.exports = AdminData