const { mongoose } = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const address = new mongoose.Schema({
    country: DEFAULT_VALIDATION,
    state: {
        type: String,
        maxLength: 256,
        trim: true
    },
    city: DEFAULT_VALIDATION,
    street: DEFAULT_VALIDATION,
    houseNumber: {
        type: Number,
        required: true,
        minLength: 1
    },
    zipCode: {
        type: Number,
        default: 0
    }
});

module.exports = { address };