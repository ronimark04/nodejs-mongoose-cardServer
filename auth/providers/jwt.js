jwt = require("jsonwebtoken");
require('dotenv').config();

// jwt = json web token


const SECRET_WORD = process.env.SECRET_WORD; // key

const generateAuthToken = (user) => {
    const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness
    }; // since we were asked to generate a token that includes these
    const token = jwt.sign(payload, SECRET_WORD);
    return token;
};

const verifyToken = (tokenFromClient) => {
    try {
        const payload = jwt.verify(tokenFromClient, SECRET_WORD);
        return payload;
    }
    catch (error) {
        return null;
    }
};

module.exports = { generateAuthToken, verifyToken };