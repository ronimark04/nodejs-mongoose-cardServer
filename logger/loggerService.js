const morganLogger = require("./morganLogger");
const config = require("config");

const LOGGER = config.get("LOGGER");

const loggerMiddleware = () => {
    if (LOGGER === "morgan") {
        return morganLogger;
    }
};

module.exports = { loggerMiddleware };