const { throwError } = require("../../utils/handleErrors");
const Card = require("../models/mongodb/Card");

const generateBizNum = async () => {
    let cardCount = await Card.countDocuments();
    if (cardCount === 9_899_999) {
        const error = new Error("Reached maximum number of cards in system");
        error.status = 507;
        return throwError("MongoDB", error);
    }

    let bizNum;
    do {
        bizNum = Math.floor(Math.random() * (9_999_999 - 1_000_000 + 1)) + 1_000_000;
    }
    while (await bizNumExists(bizNum));

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
        return throwError("MongoDB", err);
    }
};

module.exports = { generateBizNum };