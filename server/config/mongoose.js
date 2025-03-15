const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/GoExplore');
const ab = mongoose.connection
ab.once('open',(err)=>{
    if (err) {
        console.log(err);
        return false
    }
    console.log('Mongoose is Connected');  
})
module.exports = ab