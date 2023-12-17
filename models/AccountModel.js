const mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    type: {
        type: Number,
        default: -1
    },
    account: {
        type: Number,
        required: true
    },
    remarks: String
})
let AccountModel = mongoose.model('accounts',AccountSchema);

module.exports = AccountModel;