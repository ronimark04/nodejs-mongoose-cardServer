const { mongoose } = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./mongooseValidators");

const image = new mongoose.Schema({
    url: URL,
    alt: {
        ...DEFAULT_VALIDATION,
        required: false
    }
});

module.exports = { image };