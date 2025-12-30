const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require("../services/map.service");
const { sendMessageToSocketId } = require("../socket")
const rideModel = require("../models/ride.model")

module.exports.createARide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { pickup, destination, vehicleType } = req.body;

        const ride = await rideService.createRide({ user : req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        (async () => {
            try {
              const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
      
              if (!pickupCoordinates) return; 
      
              const captainInRadius = await mapService.getCaptainInTheRadious(pickupCoordinates.lat, pickupCoordinates.lng, 2);

              const rideWithUser = await rideModel.findOne({_id : ride._id }).populate("user")

              ride.otp = "";

              captainInRadius.forEach((captain) => {
                if (captain.socketId) {
                  sendMessageToSocketId(captain.socketId, {
                    event: "new-ride",
                    data: rideWithUser,
                  });
                }
              });
            } catch (err) {
              console.error("Error notifying captains:", err);
            }
          })();

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports.getFareEstimate = async (req, res) => {
    try {
        const { pickup, destination } = req.query;
        if (!pickup || !destination) {
            return res.status(400).json({ error: 'Pickup and Destination are required' });
        }

        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports.confirmRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { rideId } = req.body;

        const ride = await rideService.confirmRide({rideId, captainId : req.captain._id});

        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-confirmed",
            data: ride,
        });
         
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

};

module.exports.startRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { rideId, otp } = req.query;

        const ride = await rideService.startRide({ rideId, captainId : req.captain._id, otp });
        
        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-started",
            data: ride,
        });

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports.finishRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }   
        const { rideId } = req.body;

        const ride = await rideService.endRide({ rideId, captainId : req.captain._id });
        
        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-ended",
            data: ride,
        });
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};