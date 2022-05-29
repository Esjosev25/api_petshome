const mongoose = require('mongoose');
VaccineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        maxLength: 13
    },
    description: {
        type: String,
        maxlength: 150
    },
    noDosis: {
        type: Number,
        required: true
    }
});



module.exports = Vaccine = mongoose.model('vaccine', PetSchema);