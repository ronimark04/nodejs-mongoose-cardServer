const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../../helpers/mongodb/mongooseValidators");
const { PHONE, EMAIL, URL } = require("../../../helpers/mongodb/mongooseValidators");
const { image } = require("../../../helpers/mongodb/image");
const { address } = require("../../../helpers/mongodb/address");
const { name } = require("../../../helpers/mongodb/name");

const cardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024
    },
    phone: PHONE,
    email: EMAIL,
    web: URL,
    image: image,
    address: address,
    bizNumber: {
        type: Number,
        required: true,
        min: 1_000_000, // min 7 digits (minLength only works on strings)
        max: 9_999_999 // max 7 digits. We can use underscore for readability
    },
    likes: [String], // an array of strings
    createAt: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;