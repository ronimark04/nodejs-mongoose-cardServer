const { mongoose } = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./mongooseValidators");

const image = new mongoose.Schema({
    url: URL,
    alt: {
        type: String,
        required: false,
        maxLength: 256,
        trim: true,
        lowercase: true,
    }
});

module.exports = { image };