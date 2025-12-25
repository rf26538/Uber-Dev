const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blaclistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fullname, email, password, vehicle } = req.body;

        const isExistingCaptain = await captainModel.findOne({ email });
        if (isExistingCaptain) {
            return res.status(400).json({ message: 'Captain with this email already exists' });
        }

        const hashPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password : hashPassword,
            color : vehicle.color,
            plate : vehicle.plate,
            capacity : vehicle.capacity,
            type : vehicle.type
        });

        const token = captain.generateAuthToken();

        res.status(201).json({ message: 'Captain registered successfully', captain, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const isMatch = await captain.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({ message: 'Captain logged in successfully', captain, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getCaptainProfile = async (req, res) => {    
    res.status(200).json({ captain :  req.captain});
}

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];

    await blaclistTokenModel.create({token});
    res.clearCookie('token');

    res.status(200).json({ message: "Captain logged out successfully" });
}