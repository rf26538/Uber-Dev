const mapService = require('../services/map.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const coordinates = await mapService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
       res.status(404).json({ message: 'Cordinate not found' });
    }
}

module.exports.getDistanceAndTime = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;
        
        const result = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: 'Distance and time not found' });
    }   
}

module.exports.getAutoCompleteSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;
        const suggestions = await mapService.getSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(404).json({ message: 'Suggestions not found' });
    }
}