const { throwError, handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./providers/jwt");

const auth = (req, res, next) => {
    try {
        const tokenFromClient = req.header("x-auth-token");
        if (!tokenFromClient) { // check if there is a token at all
            const error = new Error("No token");
            error.status = 401;
            return throwError("Authentication", error); // in the log this will print: "Authentication Error: No token"
        }
        const userInfo = verifyToken(tokenFromClient);
        if (!userInfo) { // check if the token is valid
            const error = new Error("Invalid token");
            error.status = 401;
            return throwError("Authentication", error);
        }

        req.user = userInfo; // if the token is valid, we add the verified token to the request object
        return next(); // stop the function and move on to the next middleware
    }
    catch (error) {
        return handleError(res, 401, error.message);
    }

    return handleError(res, 500, "No token generator found");
};

module.exports = auth;