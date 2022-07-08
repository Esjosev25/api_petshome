const mongoose = require('mongoose');

const OrgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
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
    description: {
        type: String,
    },
    verification: {
        type: Boolean,
        default: false,
    },

});

module.exports = Org = mongoose.model('org', OrgSchema);