const chalk = require("chalk");

const createError = (validator, error) => { // validator = where did the error occur? (mongodb, authentication, etc) error = what was the error?

    // now we edit the error object:
    error.message = `${validator} Error: ${error.message}`; // add the validator to the error message
    error.status = error.status || 400; // if there is no status property, set it to 400
    throw new Error(error); // throw the error object
};

const handleError = (res, status, message = "") => {
    console.log(chalk.bgYellowBright.red(message));
    return res.status(status).send(message);
};

module.exports = { createError, handleError }; // the difference between these two is that createError is used to create an error object to be thrown, while handleError is used to send an error message to the client.