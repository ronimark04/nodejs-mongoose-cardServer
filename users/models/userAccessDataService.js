const User = require('./mongodb/User');
const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require('../../utils/handleErrors');
const { create } = require('lodash');
const { generatePassword, comparePasswords } = require('../helpers/bcrypt');


const registerUser = async (newUser) => {
    try {
        newUser.password = await generatePassword(newUser.password);
        let user = new User(newUser);
        user = await user.save(); //.save is a mongoose method that saves the user to the database
        lessInfoUser = { email: user.email, name: user.name, _id: user._id }; // we don't want to return the password, only partial info
        return lessInfoUser;
    } catch (error) {
        return createError("Mongoose", error);
    }
};


const getUser = async (userId) => {
    try {
        let user = await User.findById(userId);
        return user;
    }
    catch (err) {
        return createError("Mongoose", err);
    }
};

const loginUser = async (email, password) => {
    try {
        const userFromDB = await User.findOne({ email: email });
        if (!userFromDB) {
            const error = new Error("User not found. Please register");
            error.status = 401;
            return createError("Authentication", error);
        }
        const isPasswordCorrect = await comparePasswords(password, userFromDB.password);
        if (!isPasswordCorrect) {
            const error = new Error("Password incorrect");
            error.status = 401;
            return createError("Authentication", error);
        }

        const token = await generateAuthToken(userFromDB);
        return token;
    }
    catch (err) {
        createError("Mongoose", err);
    }
}

module.exports = { registerUser, getUser, loginUser };