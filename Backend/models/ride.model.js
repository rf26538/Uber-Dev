const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain'
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },  
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,   
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number //In seconds
    },
    distance: {
        type: Number  //In meters
    },
    paymentID: {
        type: String
    },
    orderID: {
        type: String
    },
    Signature: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    otp: {
        type: String,
        select: false,
        required: true
    }
}, { timestamps: true });

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;