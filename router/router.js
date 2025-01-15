const express = require('express');
const router = express.Router();
const cardsRouterController = require("../cards/routes/cardRestControllers");
const userRouterController = require("../users/routes/userRestControllers");
const { handleError } = require('../utils/handleErrors');

router.use("/cards", cardsRouterController); // when a request is made to /cards, it will be handled by cardsRouterController
router.use("/users", userRouterController);  // when a request is made to /users, it will be handled by userRouterController

router.use((req, res) => {
    handleError(res, 404, "Path Not found");
}) // any request to path not found will return 404

module.exports = router;
