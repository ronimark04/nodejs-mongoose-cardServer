const auth = require('../../auth/authService');
const { handleError } = require('../../utils/handleErrors');
const { registerUser, getUser, loginUser, updateUser } = require('../models/userAccessDataService');
const express = require('express');
const validateLogin = require('../validation/joi/loginValidation');
const validateRegistration = require('../validation/joi/registerValidation');
const validateUpdate = require('../validation/joi/updateValidation');
const { normalizeUser } = require('../helpers/normalize');
const router = express.Router();

// register
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

// login
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

// get user by id
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

// update user
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = req.body;
        const userInfo = req.user;
        if (id !== userInfo._id) {
            return handleError(res, 403, "Authorization Error: Only the user or an admin can edit the user's profile");
        }
        const valErrorMessage = validateUpdate(updatedUser);
        if (valErrorMessage !== "") {
            return handleError(res, 400, "Validation Error: " + valErrorMessage);
        }
        let user = await normalizeUser(updatedUser);
        user = await updateUser(id, updatedUser);
        res.send(user);
    }
    catch (err) {
        return handleError(res, 400, err.message);
    }
})

module.exports = router;