const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');
const routes = express.Router();
const RentalCarController = require('../../../../controller/api/v1/RentalCarController/RentalCarController');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Get all rental cars
routes.get('/rental-cars', RentalCarController.getAllRentalCars);

// Get a single rental car by ID
routes.get('/rental-cars/:id', RentalCarController.getRentalCarById);

// Create a new rental car
routes.post('/rental-cars', upload.single('image'), [
    check('carName').notEmpty().withMessage('Car name is required'),
    check('carType').notEmpty().withMessage('Car type is required'),
    check('pricePerDay').isNumeric().withMessage('Price per day must be a number')
], RentalCarController.createRentalCar);

// Update a rental car by ID
routes.put('/rental-cars/:id', upload.single('image'), [
    check('carName').optional().notEmpty().withMessage('Car name is required'),
    check('carType').optional().notEmpty().withMessage('Car type is required'),
    check('pricePerDay').optional().isNumeric().withMessage('Price per day must be a number')
], RentalCarController.updateRentalCar);

// Delete a rental car by ID
routes.delete('/rental-cars/:id', RentalCarController.deleteRentalCar);

module.exports = routes;