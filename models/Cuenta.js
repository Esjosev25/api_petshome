const mongoose = require('mongoose');

const cuentaSchema = new mongoose.Schema({
    noCuenta: {
        type: String,
        required: true
    },
    nameBanck: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
});

module.exports = Cuenta = mongoose.model('cuenta', cuentasSchema);