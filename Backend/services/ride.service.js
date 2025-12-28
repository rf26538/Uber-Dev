const rideModel = require('../models/ride.model');
const mapService = require('./map.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and Destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        car: 50,      
        auto: 30,
        bike: 20
    };

    const perKmRate = {
        car: 15,      
        auto: 10,
        bike: 8
    };

    const perMinuteRate = {
        car: 3,      
        auto: 2,
        bike: 1.5
    };

    const fare = {
        car: Math.round(
            (baseFare.car + 
             perKmRate.car * (distanceTime.distance.value / 1000) + 
             perMinuteRate.car * (distanceTime.time.value / 60)) * 100
          ) / 100,
        auto: Math.round(
            (baseFare.auto + 
             perKmRate.auto * (distanceTime.distance.value / 1000) + 
             perMinuteRate.auto * (distanceTime.time.value / 60)) * 100
          ) / 100,
        bike: Math.round(
            (baseFare.bike + 
             perKmRate.bike * (distanceTime.distance.value / 1000) + 
             perMinuteRate.bike * (distanceTime.time.value / 60)) * 100
          ) / 100,
        distance: distanceTime.distance.text,
        time: distanceTime.time.text
    }

    return fare;
}

function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }
    const fare = await getFare(pickup, destination);
    const rideData = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    }); 
    
    return rideData;
};

module.exports.confirmRide = async ({ rideId, captainId }) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    await rideModel.findOneAndUpdate({ _id: rideId }, { 
        status: 'accepted',
        captain: captainId
    });

    const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate("captain");
    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
};

module.exports.getFare = getFare;