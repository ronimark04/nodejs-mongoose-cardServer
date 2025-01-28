const { normalizeField } = require("../../utils/normalizeField");

const normalizeUser = async (user) => {
    return {
        ...user,
        image: {
            url: normalizeField(user.image.url, "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"),
            alt: normalizeField(user.image.alt, "Profile Image")
        },
        name: {
            ...user.name,
            middle: user.name.middle || "",
        },
        address: {
            ...user.address,
            state: user.address.state || "",
        },
        isAdmin: user.isAdmin ?? false,
        isBusiness: user.isBusiness ?? false,
        createdAt: user.createdAt || new Date()
    };
}

module.exports = { normalizeUser };