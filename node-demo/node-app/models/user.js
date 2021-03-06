const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    identity: {
        type: String,
        required: true
    }
})
const userModel = mongoose.model("user", userSchema)
module.exports = userModel;