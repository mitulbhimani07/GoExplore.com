const { validationResult } = require('express-validator');
const HotelBooking = require('../../../../model/api/v1/GoExplore.HotelsModel/HotelsModel');
const fs = require('fs');
const path = require('path');

// Get all hotel bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await HotelBooking.find();
        res.status(200).json({ success: true, data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await HotelBooking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Create a new booking
exports.createBooking = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const images = req.files ? req.files.map(file => file.path) : [];
        const newBooking = await HotelBooking.create({ ...req.body, images });
        res.status(201).json({ success: true, data: newBooking });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update a booking by ID
exports.updateBooking = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const images = req.files ? req.files.map(file => file.path) : [];
        const updatedBooking = await HotelBooking.findByIdAndUpdate(req.params.id, { ...req.body, images }, { new: true, runValidators: true });
        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, data: updatedBooking });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await HotelBooking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Delete associated images
        if (booking.images && booking.images.length > 0) {
            booking.images.forEach(imagePath => {
                const fullPath = path.join(__dirname, '..', '..', '..', '..', imagePath);
                console.log(`Attempting to delete image: ${fullPath}`);
                if (fs.existsSync(fullPath)) {
                    try {
                        fs.unlinkSync(fullPath);
                        console.log(`Deleted image: ${fullPath}`);
                    } catch (err) {
                        console.error(`Error deleting file: ${fullPath}`, err);
                    }
                } else {
                    console.log(`File does not exist: ${fullPath}. Skipping file deletion.`);
                }
            });
        }

        await HotelBooking.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};