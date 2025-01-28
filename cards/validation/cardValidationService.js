const joiValidateCard = require("./joi/joiValidation");
const { throwError } = require('../../utils/handleErrors');


const validateCard = (card) => {
    const { error } = joiValidateCard(card); // this will return an object with an error property if there is an error, this line destructures that error out of the object
    if (error) {
        return { valErrorMessage: error.details[0].message }; // this is a structure within the error object that Joi returns
    } else {
        return { valErrorMessage: "" }; // in boolean that is falsey, so we can check if the return value is falsey to know if the validation passed. this is set up this way for destructuring in the controller
    }

};

module.exports = validateCard;