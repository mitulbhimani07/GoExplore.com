const express = require('express');
const { check } = require('express-validator');
const routes = express.Router();
const FlightsController = require('../../../../controller/api/v1/FlightsController/FlightsController');

// Get all flights
routes.get('/flights', FlightsController.getAllFlights);

// Get a single flight by ID
routes.get('/flights/:id', FlightsController.getFlightById);

// Create a new flight
routes.post('/flights', [
    check('airline').notEmpty().withMessage('Airline is required'),
    check('flightNumber').notEmpty().withMessage('Flight number is required'),
    check('departureAirport').notEmpty().withMessage('Departure airport is required'),
    check('arrivalAirport').notEmpty().withMessage('Arrival airport is required'),
    check('departureTime').notEmpty().withMessage('Departure time must be a valid date'),
    check('arrivalTime').notEmpty().withMessage('Arrival time must be a valid date'),
    check('price').isNumeric().withMessage('Price must be a number'),
    check('journeyDuration').notEmpty().withMessage('Journey duration is required'),
    check('classType').isIn(['Economy', 'Business', 'First']).withMessage('Class type must be Economy, Business, or First')
], FlightsController.createFlight);

// Update a flight by ID
routes.put('/flights/:id', [
    check('airline').optional().notEmpty().withMessage('Airline is required'),
    check('flightNumber').optional().notEmpty().withMessage('Flight number is required'),
    check('departureAirport').optional().notEmpty().withMessage('Departure airport is required'),
    check('arrivalAirport').optional().notEmpty().withMessage('Arrival airport is required'),
    check('departureTime').optional().notEmpty().withMessage('Departure time must be a valid date'),
    check('arrivalTime').optional().notEmpty().withMessage('Arrival time must be a valid date'),
    check('price').optional().isNumeric().withMessage('Price must be a number'),
    check('journeyDuration').optional().notEmpty().withMessage('Journey duration is required'),
    check('classType').optional().isIn(['Economy', 'Business', 'First']).withMessage('Class type must be Economy, Business, or First')
], FlightsController.updateFlight);

// Delete a flight by ID
routes.delete('/flights/:id', FlightsController.deleteFlight);

// Fail Login 
routes.get('/adminFailLogin', async (req, res) => {
    try {
        res.status(200).json({ msg: "Admin Failed Login.." });
    } catch (err) {
        res.status(400).json({ msg: "Something is wrong", error: err });
    }
});

module.exports = routes;