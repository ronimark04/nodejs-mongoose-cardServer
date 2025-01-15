// this is validation for the database, on top of validation we did for mongoose and on top of yup validation on the frontend

const Joi = require('joi');

const joiValidateCard = (card) => {
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

    const schema = Joi.object({
        title: Joi.string().min(2).max(256).required(),
        subtitle: Joi.string().min(2).max(256).required(),
        description: Joi.string().min(2).max(1024).required(),
        phone: Joi.string().ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).rule({ message: "Phone number must be in the format 05x-xxxxxxx" }),
        email: Joi.string().ruleset.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).rule({ message: "Must be a valid email" }).required(), // pattern is just for strings, regex is also for other types of data
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

module.exports = joiValidateCard;