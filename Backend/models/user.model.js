const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
        require: true,
        unique: true,
        minlength: [5, "Email must be at least 3 characters long"]
    },
    password: {
        type: String,
        require: true,
        select: false,
        minlength: [8, "Password must be at least 8 characters long"]
    },
    socketId: {
        type: String,
        default: null
    }
})

userSchema.methods.generateAuthToken =  function () {
    const token = jwt.sign({ _id: this._id, email: this.email },process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
};


const userModel = mongoose.model("user", userSchema);
module.exports = userModel;