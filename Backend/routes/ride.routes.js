const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post("/create",
    body("pickup").isString().notEmpty().withMessage("Pickup address is required"),
    body("destination").isString().notEmpty().withMessage("Dropoff address is required"),
    body("vehicleType").isString().isIn(["car", "auto", "bike"]).withMessage("Invalid vehicle type"),
    authMiddleware.authUser,
    rideController.createARide
);

router.get("/fare-estimate",
    authMiddleware.authUser,
    query("pickup").isString().notEmpty().withMessage("Pickup address is required"),
    query("destination").isString().notEmpty().withMessage("Dropoff address is required"),
    rideController.getFareEstimate
);

router.post("/confirm",
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("Invalid Ride ID"),
    rideController.confirmRide
);

router.get("/start-ride",
    authMiddleware.authCaptain,
    query("rideId").isMongoId().withMessage("Invalid Ride ID"),
    query("otp").isString().isLength({ min: 6, max: 6 }).withMessage("Invalid OTP"),
    rideController.startRide
);

router.post("/finish-ride",
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("Invalid Ride ID"),
    rideController.finishRide
);
    
module.exports = router;