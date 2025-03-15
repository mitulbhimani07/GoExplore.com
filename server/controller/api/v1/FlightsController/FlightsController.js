const { validationResult } = require('express-validator');
const Flight = require('../../../../model/api/v1/GoExplore.FlightsModel/FilghtsModels'); // Corrected import

// Get all flights
exports.getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json({ success: true, data: flights });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get a single flight by ID
exports.getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).json({ success: false, message: 'Flight not found' });
        }
        res.status(200).json({ success: true, data: flight });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Create a new flight
exports.createFlight = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const newFlight = await Flight.create(req.body);
        res.status(201).json({ success: true, data: newFlight });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update a flight by ID
exports.updateFlight = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedFlight) {
            return res.status(404).json({ success: false, message: 'Flight not found' });
        }
        res.status(200).json({ success: true, data: updatedFlight });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete a flight by ID
exports.deleteFlight = async (req, res) => {
    try {
        const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
        if (!deletedFlight) {
            return res.status(404).json({ success: false, message: 'Flight not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


