const mongoose = require('mongoose');

const RentalCarSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: true
    },
    carType: {
        type: String,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const RentalCar = mongoose.model('RentalCar', RentalCarSchema);

module.exports = RentalCar;