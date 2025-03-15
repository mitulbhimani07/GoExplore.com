const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');
const routes = express.Router();
const HotelsController = require('../../../../controller/api/v1/HotelsController/HotelsController');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', '..', '..', 'uploads', 'Hotels'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Get all hotel bookings
routes.get('/bookings', HotelsController.getAllBookings);

// Get a single booking by ID
routes.get('/bookings/:id', HotelsController.getBookingById);

// Create a new booking
routes.post('/bookings', upload.array('images', 10), [
    check('hotelName').notEmpty().withMessage('Hotel name is required'),
    check('roomNumber').notEmpty().withMessage('Room number is required'),
    check('guestName').notEmpty().withMessage('Guest name is required'),
    check('checkInDate').isISO8601().withMessage('Check-in date must be a valid date'),
    check('checkOutDate').isISO8601().withMessage('Check-out date must be a valid date'),
    check('price').isNumeric().withMessage('Price must be a number'),
    check('location').notEmpty().withMessage('Location is required')
], HotelsController.createBooking);

// Update a booking by ID
routes.put('/bookings/:id', upload.array('images', 10), [
    check('hotelName').optional().notEmpty().withMessage('Hotel name is required'),
    check('roomNumber').optional().notEmpty().withMessage('Room number is required'),
    check('guestName').optional().notEmpty().withMessage('Guest name is required'),
    check('checkInDate').optional().isISO8601().withMessage('Check-in date must be a valid date'),
    check('checkOutDate').optional().isISO8601().withMessage('Check-out date must be a valid date'),
    check('price').optional().isNumeric().withMessage('Price must be a number'),
    check('location').optional().notEmpty().withMessage('Location is required')
], HotelsController.updateBooking);

// Delete a booking by ID
routes.delete('/bookings/:id', HotelsController.deleteBooking);

module.exports = routes;