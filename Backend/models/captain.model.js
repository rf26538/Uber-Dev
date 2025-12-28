const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: { 
            type: String,
            required: true, 
            minlength: [3, "First name must be at least 3 characters long"] 
        },
        lastname: { 
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"] 
        }
    },
    email: { 
        type: String,
        required: true,
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true,
        select: false,
        minlength: [8, "Password must be at least 8 characters long"] 
    },
    phone: { type: String},
    socketId: { type: String },
    status: { 
        type: String, 
        enum: ['online', 'offline'], 
        default: 'offline' 
    },
    vehicle: {
        color : { 
            type: String, 
            required: true, 
            minlength: [3, "Color must be at least 3 characters long"]  
        },
        plate : { 
            type: String, 
            required: true, 
            minlength: [3, "Plate must be at least 3 characters long"]  
        },
        capacity : { 
            type: Number, 
            required: true , 
            minlength: [1, "Capacity must be at least 1"] 
        },
        type : { 
            type: String, 
            required: true, 
            enum: ['bike', 'car', 'auto']  
        },
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id, email: this.email },  
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    );
    return token;
}

captainSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}   

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('captain', captainSchema);