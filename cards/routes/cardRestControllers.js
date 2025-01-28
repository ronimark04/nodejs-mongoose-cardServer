const express = require('express');
const { createCard, getCards, getCard, getMyCards, updateCard, likeCard } = require('../models/cardAccessDataService');
const auth = require('../../auth/authService');
const { normalizeCard } = require('../helpers/normalize');
const { handleError } = require('../../utils/handleErrors');
const validateCard = require('../validation/cardValidationService');

const router = express.Router();

// get all cards
router.get("/", async (req, res) => {
    try {
        let cards = await getCards();
        res.send(cards);
    }
    catch (err) {
        return handleError(res, err.status || 400, err.message);
    }
});

// get all my cards
router.get("/my-cards", auth, async (req, res) => {
    try {
        const id = req.user._id;
        let cards = await getMyCards(id);
        res.send(cards);
    } catch (error) {
        return handleError(res, error.status || 400, error.message);
    }
});

// get card by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let card = await getCard(id);
        res.send(card);
    } catch (error) {
        return handleError(res, error.status || 400, error.message);
    }
});

// create new card
router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user; //taken from the auth function in authService.js. I think this is the verified token that contains the relevant user info (isAdmin, isBusiness, etc.)
        if (!userInfo.isBusiness) { // if user is not a business user
            return handleError(res, 403, "Only business users can create cards");
        }
        console.log("Request Body:", req.body);
        const { valErrorMessage } = validateCard(req.body);
        if (valErrorMessage !== "") {
            return handleError(res, 400, "Validation " + valErrorMessage);
        }
        let card = await normalizeCard(req.body, userInfo._id);
        card = await createCard(card);
        res.status(201).send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

// update card
router.put("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const newCard = req.body;
        const { id } = req.params;
        const originalCard = await getCard(id);

        if (userInfo._id != originalCard.user_id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only the user who created the card or an admin can update the card");
        }
        const { valErrorMessage } = validateCard(req.body); // maybe doesn't need destructuring?
        if (valErrorMessage !== "") {
            return handleError(res, 400, "Validation" + valErrorMessage);
        }
        let card = await normalizeCard(newCard, userInfo._id);
        card = await updateCard(id, card);
        res.send(card); // ?
    }
    catch (err) {
        return handleError(res, 400, err.message);
    }
});

// like/unlike a card
router.patch("/:id", auth, async (req, res) => {
    try {
        let { id } = req.params;
        let userId = req.user._id;
        let card = await likeCard(id, userId);
        res.send(card);
    }
    catch (err) {
        return handleError(res, 400, err.message);
    }
});

// delete card
router.delete("/:id", auth, async (req, res) => {
    try {
        let { id } = req.params;
        const userInfo = req.user;
        if (userInfo._id != originalCard.user_id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only the user who created the card or an admin can delete the card");
        }
        let card = await deleteCard(id);
        res.send(card);
    }
    catch (err) {
        return handleError(res, 400, err.message);
    }
});

module.exports = router;
