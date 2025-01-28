const { throwError } = require('../../utils/handleErrors');
const Card = require('./mongodb/Card');

const getCards = async () => {
    try {
        let cards = await Card.find();
        return cards;
    }
    catch (err) {
        return throwError("Mongoose", err);
    }
};

const getCard = async (cardId) => {
    try {
        let card = await Card.findById(cardId);
        return card;
    }
    catch (err) {
        return throwError("Mongoose", err);
    }
};

const getMyCards = async (userId) => {
    try {
        let cards = await Card.find({ user_id: userId });
        return cards;
    }
    catch (err) {
        return throwError("Mongoose", err);
    }
};

const createCard = async (newCard) => {
    try {
        let card = new Card(newCard);
        card = await card.save();
        return card;
    } catch (error) {
        return throwError("Mongoose", error);
    }
};

const updateCard = async (cardId, newCard) => {
    try {
        let card = await Card.findByIdAndUpdate(cardId, newCard, { new: true }); // new: true returns the updated document instead of the default old one
        return card;
    }
    catch (err) {
        return throwError("Mongoose", err);
    }
};

const likeCard = async (cardId, userId) => {
    try {
        let card = await Card.findById(cardId);
        if (!card) { // if the card is not found in the database, throw an error
            const error = new Error("Card ID not found in database");
            error.status = 404;
            return throwError("Mongoose", error);
        };
        if (card.likes.includes(userId)) { //if the user has already liked the card, remove the like
            let newLikesArray = card.likes.filter(id => id !== userId);
            card.likes = newLikesArray;
        } else { // if the user has not liked the card, add the like
            card.likes.push(userId);
        }
        await card.save();
        return card;
    }
    catch (err) {
        throw new Error("Mongoose: " + err.message);
    }
};

const deleteCard = async (cardId) => {
    try {
        let card = await Card.findByIdAndDelete(cardId);
        return card;
    }
    catch (err) {
        throw new Error("Mongoose: " + err.message);
    }
};

module.exports = { createCard, getCards, getCard, getMyCards, updateCard, likeCard, deleteCard };