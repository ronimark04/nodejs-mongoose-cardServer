const express = require('express');
const { createCard, getCards, getCard, getMyCards, updateCard, likeCard, deleteCard } = require('../models/cardAccessDataService');
const auth = require('../../auth/authService');
const { normalizeCard } = require('../helpers/normalize');
const { handleError } = require('../../utils/handleErrors');
const { validateCard } = require('../validation/joi/joiValidation');

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
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return handleError(res, 403, "Error: Non business users cannot create cards");
        }
        const { valErrorMessage } = validateCard(req.body);
        if (valErrorMessage !== "") {
            return handleError(res, 400, "Validation Error: " + valErrorMessage);
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
        const userId = originalCard.user_id.toString();

        if (userInfo._id != userId && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only the creator of the card or an admin can edit it");
        }
        const { valErrorMessage } = validateCard(req.body);
        if (valErrorMessage !== "") {
            return handleError(res, 400, "Validation Error: " + valErrorMessage);
        }
        let card = await normalizeCard(newCard, userInfo._id);
        card = await updateCard(id, card);
        res.send(card);
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
        const originalCard = await getCard(id);
        const { bizNumber } = req.body;
        const userId = originalCard.user_id.toString();

        if (userInfo._id != userId && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only the user who created the card or an admin can delete the card");
        }
        if (userInfo._id === userId && bizNumber === originalCard.bizNumber) {
            let card = await deleteCard(id);
            res.send(card);
        } else {
            return handleError(res, 400, "Invalid business number provided");
        }
    }
    catch (err) {
        return handleError(res, 400, err.message);
    }
});

module.exports = router;
