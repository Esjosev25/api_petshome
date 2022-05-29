const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        default: Date.now
    },
    DPI: {
        type: String,
        required: true,
        maxLength: 13
    },
    profilepic: {
        type: String,
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
    avatar: {
        type: String
    },
});

module.exports = User = mongoose.model('user', UserSchema);