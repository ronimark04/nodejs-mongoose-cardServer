const chalk = require("chalk");

const throwError = (validator, error) => {
    error.message = `${validator} Error: ${error.message}`;
    error.status = error.status || 400;
    throw new Error(error);
};

const handleError = (res, status, message = "") => {
    console.log(chalk.bgYellowBright.red(message));
    return res.status(status).send(message);
};

module.exports = { throwError, handleError };