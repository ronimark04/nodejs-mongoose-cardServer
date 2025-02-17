const Joi = require("joi");

const registerValidation = (user) => {
    const schema = Joi.object({
        name: Joi.object()
            .keys({
                first: Joi.string().min(2).max(256).required(),
                middle: Joi.string().min(2).max(256).allow(""),
                last: Joi.string().min(2).max(256).required(),
            })
            .required(),
        phone: Joi.string()
            .ruleset.regex(/0[0-9]{2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
            .rule({ message: 'Must be a valid phone number' })
            .required(),
        email: Joi.string()
            .ruleset.pattern(
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
            )
            .rule({ message: 'Must be a valid email address' })
            .required(),
        password: Joi.string()
            .regex(
                /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
            ).message({
                message:
                    'Must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
            })
            .required(),
        image: Joi.object()
            .keys({
                url: Joi.string()
                    .regex(
                        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
                    )
                    .message("User image must be a valid url")
                    .allow(""),
                alt: Joi.string().min(2).max(256).allow(""),
            })
            .required(),
        address: Joi.object()
            .keys({
                state: Joi.string().allow(""),
                country: Joi.string().required(),
                city: Joi.string().required(),
                street: Joi.string().required(),
                houseNumber: Joi.number().required(),
                zip: Joi.number(),
            })
            .required(),
        isBusiness: Joi.boolean().required(),
        isAdmin: Joi.boolean().allow(""),
    });
    return schema.validate(user);
};

const validateRegistration = (user) => {
    const { error } = registerValidation(user);
    console.log(error);

    if (error) return error.details[0].message;
    return "";
};

module.exports = validateRegistration;