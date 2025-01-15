const { createError } = require("../../utils/handleErrors");
const Card = require("../models/mongodb/Card");
const _ = require("lodash");

const generateBizNum = async () => {

    let cardCount = await Card.countDocuments(); // get the number of  existing cards in the db
    if (cardCount === 9_899_999) {
        const error = new Error("Maximum number of cards in system reached");
        error.status = 507;
        return createError("MongoDB", error);
    }

    let bizNum;
    do {
        bizNum = _.random(1_000_000, 9_999_999);
    }
    while (await bizNumExists(bizNum)); // do while instead of while just to save a line of code

    return bizNum;
};

const bizNumExists = async (bizNum) => {
    try {
        const exists = await Card.findOne({
            bizNumber: bizNum
        })
        return exists;
    }
    catch (err) {
        err.status = 500;
        return createError("MongoDB", err);
    }

};

module.exports = { generateBizNum };