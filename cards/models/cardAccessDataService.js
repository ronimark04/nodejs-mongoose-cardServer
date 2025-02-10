const Card = require('./mongodb/Card');

const getCards = async () => {
    try {
        let cards = await Card.find();
        return cards;
    }
    catch (err) {
        throw err;
    }
};

const getCard = async (cardId) => {
    try {
        let card = await Card.findById(cardId);
        return card;
    }
    catch (err) {
        throw err;
    }
};

const getMyCards = async (userId) => {
    try {
        let cards = await Card.find({ user_id: userId });
        return cards;
    }
    catch (err) {
        throw err;
    }
};

const createCard = async (newCard) => {
    try {
        let card = new Card(newCard);
        card = await card.save();
        return card;
    } catch (error) {
        throw err;
    }
};

const updateCard = async (cardId, newCard) => {
    try {
        let card = await Card.findByIdAndUpdate(cardId, newCard, { new: true });
        return card;
    }
    catch (err) {
        throw err;
    }
};

const likeCard = async (cardId, userId) => {
    try {
        let card = await Card.findById(cardId);
        if (!card) {
            const error = new Error("Error: Card not found in database");
            error.status = 404;
            throw error;
        };
        if (card.likes.includes(userId)) {
            let newLikesArray = card.likes.filter(id => id !== userId);
            card.likes = newLikesArray;
        } else {
            card.likes.push(userId);
        }
        await card.save();
        return card;
    }
    catch (err) {
        throw err;
    }
};

const deleteCard = async (cardId) => {
    try {
        let card = await Card.findByIdAndDelete(cardId);
        return card;
    }
    catch (err) {
        throw err;
    }
};

module.exports = { createCard, getCards, getCard, getMyCards, updateCard, likeCard, deleteCard };