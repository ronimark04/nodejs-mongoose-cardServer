const User = require('./mongodb/User');
const { generateAuthToken } = require("../../auth/providers/jwt");
const { throwError } = require('../../utils/handleErrors');
const { generatePassword, comparePasswords } = require('../helpers/bcrypt');


const registerUser = async (newUser) => {
    try {
        const existingUser = await User.findOne({ email: newUser.email });
        if (existingUser) {
            const error = new Error("User already exists, please login");
            error.status = 400;
            return throwError("MongoDB", error);
        }
        newUser.password = await generatePassword(newUser.password);
        let user = new User(newUser);
        user = await user.save();
        lessInfoUser = { email: user.email, name: user.name, _id: user._id };
        return lessInfoUser;
    } catch (error) {
        return throwError("Mongoose", error);
    }
};


const getUser = async (userId) => {
    try {
        let user = await User.findById(userId);
        return user;
    }
    catch (err) {
        return throwError("Mongoose", err);
    }
};

const loginUser = async (email, password) => {
    try {
        const userFromDB = await User.findOne({ email: email });
        if (!userFromDB) {
            const error = new Error("User not found. Please register");
            error.status = 401;
            return throwError("Authentication", error);
        }
        const isPasswordCorrect = await comparePasswords(password, userFromDB.password);
        if (!isPasswordCorrect) {
            const error = new Error("Password incorrect");
            error.status = 401;
            return throwError("Authentication", error);
        }
        const token = await generateAuthToken(userFromDB);
        return token;
    }
    catch (err) {
        throwError("Mongoose", err);
    }
}

const updateUser = async (userId, updatedUser) => {
    try {
        let user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
        return user;
    } catch (err) {
        return throwError("Mongoose", err);
    }
}

module.exports = { registerUser, getUser, loginUser, updateUser };