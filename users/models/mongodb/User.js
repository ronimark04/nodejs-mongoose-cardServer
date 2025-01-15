const { mongoose } = require("mongoose");
const { DEFAULT_VALIDATION, PHONE, EMAIL } = require("../../../helpers/mongodb/mongooseValidators");
const { image } = require("../../../helpers/mongodb/image");
const { address } = require("../../../helpers/mongodb/address");
const { name } = require("../../../helpers/mongodb/name");

const userSchema = new mongoose.Schema({
    name: name,
    phone: PHONE,
    email: EMAIL,
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: image,
    address: address,
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBusiness: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;