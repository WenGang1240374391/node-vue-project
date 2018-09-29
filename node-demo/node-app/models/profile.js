const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const profileSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String
    },
    describe: {
        type: String
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String,
    }
})
const profileModel = mongoose.model("profile", profileSchema)
module.exports = profileModel