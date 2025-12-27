const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createARide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId, pickup, destination, vehicleType } = req.body;

        const ride = await rideService.createRide({ user : req.user._id, pickup, destination, vehicleType });
        return res.status(201).json(ride);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
