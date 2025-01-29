const Joi = require('joi');

const joiValidateCard = (card) => {
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

    const schema = Joi.object({
        title: Joi.string().min(2).max(256).required(),
        subtitle: Joi.string().min(2).max(256).required(),
        description: Joi.string().min(2).max(1024).required(),
        phone: Joi.string().ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).rule({ message: "Must be a valid phone number" }).required(),
        email: Joi.string().ruleset.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).rule({ message: "Must be a valid email address" }).required(),
        web: Joi.string().ruleset.regex(urlRegex).rule({ message: "Must be a valid URL" }).allow(""),
        image: Joi.object().keys({
            url: Joi.string().ruleset.regex(urlRegex).rule({ message: "Must be a valid URL" }).allow(""),
            alt: Joi.string().min(2).max(256).allow("")
        }).required(),
        address: Joi.object().keys({
            state: Joi.string().min(2).max(256).allow(""),
            country: Joi.string().min(2).max(256).required(),
            city: Joi.string().min(2).max(256).required(),
            street: Joi.string().min(2).max(256).required(),
            houseNumber: Joi.number().min(1).required(),
            zip: Joi.number()
        }).required()
    });

    return schema.validate(card);
};

const validateCard = (card) => {
    const { error } = joiValidateCard(card); // this will return an object with an error property if there is an error, this line destructures that error out of the object
    if (error) {
        return { valErrorMessage: error.details[0].message }; // this is a structure within the error object that Joi returns
    } else {
        return { valErrorMessage: "" }; // in boolean that is falsey, so we can check if the return value is falsey to know if the validation passed. this is set up this way for destructuring in the controller
    }

};

module.exports = { validateCard };