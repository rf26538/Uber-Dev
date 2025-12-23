const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({ 
    firstname, lastname, email, password, phone, color, plate, capacity, vehicleType
}) => {
    if(!firstname || !email || !password || !phone || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required to create a captain');
    }

    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        phone,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    
    return captain;
} 