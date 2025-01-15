const loginValidation = require("./joi/loginValidation");
const registerValidation = require("./joi/registerValidation");
const config = require("config");

const VALIDATOR = config.get("VALIDATOR");

const validateRegistration = (user) => {
    if (VALIDATOR === "Joi") {
        const { error } = registerValidation(user);
        if (error) return error.details[0].message;
        return "";
    }
};

const validateLogin = (user) => {
    if (VALIDATOR === "Joi") {
        const { error } = loginValidation(user);
        if (error) return error.details[0].message;
        return "";
    }
};

module.exports = { validateLogin, validateRegistration };