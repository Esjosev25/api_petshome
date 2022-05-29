const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // participante: {
    //     type: Date,
    //     default: Date.now
    // },
    location: {
        type: String,
        required: true,
        maxLength: 150
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verification: {
        type: Boolean,
        default: false,
        required: true
    },
    avatar: {
        type: String
    },
});

module.exports = Org = mongoose.model('org', OrgSchema);