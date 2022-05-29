const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        required: true,
        maxLength: 13
    },
    breed: {
        type: String,
        required: true,
    },
    castrate: {
        type: Boolean,
        required: true
    },
    availability: {
        type: Boolean,
        default: true,
        required: true
    },
    vaccines: [
        {
            vaccine: {
                type: Schema.Types.ObjectId,
                ref: 'vaccine'
            }
        }
    ]
});



module.exports = Pet = mongoose.model('pet', PetSchema);