const auth = require('../../auth/authService');
const { handleError } = require('../../utils/handleErrors');
const { registerUser, getUser, loginUser } = require('../models/userAccessDataService');
const express = require('express');
const { validateLogin, validateRegistration } = require('../validation/userValidationService');
const router = express.Router();

// THIS GOES SOMEWHERE:
// const validateErrorMessage = validateCard(req.body);
// if (validateErrorMessage !== "") {
//     return handleError(res, 400, "Validation" + validateErrorMessage);
// }

router.post("/", async (req, res) => {
    try {
        const validateErrorMessage = validateRegistration(req.body);
        if (validateErrorMessage !== "") {
            return handleError(res, 400, "Validation " + validateErrorMessage);
        }
        let user = await registerUser(req.body);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        let { id } = req.params;

        if (userInfo._id != id && !userInfo.isAdmin) {
            handleError(res, 403, "Authorization Error: Only the user or an admin can access this information.");
        }

        let user = await getUser(id);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const validateErrorMessage = validateLogin(req.body);
        if (validateErrorMessage !== "") {
            return handleError(res, 400, "Validation" + validateErrorMessage);
        }
        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

module.exports = router; // no need to export every function, just the router