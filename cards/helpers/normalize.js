const { generateBizNum } = require("./generateBizNum");


const normalizeCard = async (card, userId) => {
    // creating and returning a new object with default values for missing properties
    return {
        ...card,
        image: {
            url: card.image.url || "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
            alt: card.image.alt || "Business Card Image"
        },
        bizNumber: card.bizNumber || await generateBizNum(),
        user_id: card.user_id || userId
    };
}


module.exports = { normalizeCard };