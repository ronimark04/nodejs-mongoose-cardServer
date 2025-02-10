const { mongoose } = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const address = new mongoose.Schema({
    country: DEFAULT_VALIDATION,
    state: {
        ...DEFAULT_VALIDATION,
        required: false,
        minLength: 0
    },
    city: DEFAULT_VALIDATION,
    street: DEFAULT_VALIDATION,
    houseNumber: {
        type: Number,
        required: true,
        minLength: 1
    },
    zip: {
        type: Number,
        default: 0
    }
});

module.exports = { address };