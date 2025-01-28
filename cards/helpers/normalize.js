const { normalizeField } = require("../../utils/normalizeField");
const { generateBizNum } = require("./generateBizNum");


const normalizeCard = async (card, userId) => {
    return {
        ...card,
        image: {
            url: normalizeField(card.image.url, "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg"),
            alt: normalizeField(card.image.alt, "Business Card Image")
        },
        bizNumber: card.bizNumber || await generateBizNum(),
        user_id: card.user_id || userId
    };
}


module.exports = { normalizeCard };

// user.image?.url && user.image.url.trim() !== "" ? user.image.url : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"