const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const imgPath = '/uploads/Hotels';

const HotelBookingSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    guestName: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Booked', 'Checked In', 'Checked Out', 'Cancelled'],
        default: 'Booked'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    location: {
        type: String,
        required: true
    },
    offer: {
        type: String
    },
    description: {
        type: String
    },
    images: [{
        type: String
    }]
}, {
    timestamps: true
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', '..', '..', imgPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

HotelBookingSchema.statics.StoreImageUploads = multer({ storage: storage }).array('images', 10);
HotelBookingSchema.statics.imagePath = imgPath;

const HotelBooking = mongoose.model('HotelBooking', HotelBookingSchema);

module.exports = HotelBooking;