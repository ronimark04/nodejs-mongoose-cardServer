const loginValidation = require("./joi/loginValidation");
const registerValidation = require("./joi/registerValidation");

const validateRegistration = (user) => {
    const { error } = registerValidation(user);
    if (error) return error.details[0].message;
    return "";
};

const validateLogin = (user) => {
    const { error } = loginValidation(user);
    if (error) return error.details[0].message;
    return "";
};

module.exports = { validateLogin, validateRegistration };