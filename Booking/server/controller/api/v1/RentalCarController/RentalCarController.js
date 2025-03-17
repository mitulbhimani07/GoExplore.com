const RentalCar = require('../../../../model/api/v1/GoExplore.RentalCarModel/RentalCarModel');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// Get all rental cars
exports.getAllRentalCars = async (req, res) => {
    try {
        const rentalCars = await RentalCar.find();
        res.status(200).json({ success: true, data: rentalCars });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get a single rental car by ID
exports.getRentalCarById = async (req, res) => {
    try {
        const rentalCar = await RentalCar.findById(req.params.id);
        if (!rentalCar) {
            return res.status(404).json({ success: false, message: 'Rental car not found' });
        }
        res.status(200).json({ success: true, data: rentalCar });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Create a new rental car
exports.createRentalCar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const image = req.file ? req.file.path : '';
        const newRentalCar = await RentalCar.create({ ...req.body, image });
        res.status(201).json({ success: true, data: newRentalCar });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update a rental car by ID
exports.updateRentalCar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const rentalCar = await RentalCar.findById(req.params.id);
        if (!rentalCar) {
            return res.status(404).json({ success: false, message: 'Rental car not found' });
        }

        // Delete old image if a new one is uploaded
        if (req.file) {
            const oldImagePath = path.join(__dirname, '..', '..', '..', '..', rentalCar.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            rentalCar.image = req.file.path;
        }

        Object.assign(rentalCar, req.body);
        await rentalCar.save();

        res.status(200).json({ success: true, data: rentalCar });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete a rental car by ID
exports.deleteRentalCar = async (req, res) => {
    try {
        const rentalCar = await RentalCar.findById(req.params.id);
        if (!rentalCar) {
            return res.status(404).json({ success: false, message: 'Rental car not found' });
        }

        // Delete associated image
        const imagePath = path.join(__dirname, '..', '..', '..', '..', rentalCar.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await RentalCar.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};