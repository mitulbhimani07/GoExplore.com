const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true
    },
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['On Time', 'Delayed', 'Cancelled'],
        default: 'On Time'
    },
    journeyDuration: {
        type: String,
        required: true
    },
    classType: {
        type: String,
        enum: ['Economy', 'Business', 'First'],
        required: true
    }
}, {
    timestamps: true
});

const Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;