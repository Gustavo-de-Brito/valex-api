import joi from 'joi';

const codeCvcRegex = /^[0-9]{3}$/;
const expirationDateRegex = /^[0-9]{2}\/[0-9]{2}/;
const passwordRegex = /^[0-9]{4}$/;

const activeCardSchema = joi.object(
  {
    cardNumber: joi.string().required(),
    codeCvc: joi.string().regex(codeCvcRegex).required(),
    cardHolderName: joi.string().required(),
    expirationDate: joi.string().regex(expirationDateRegex).required(),
    password: joi.string().regex(passwordRegex).required()
  }
);

export default activeCardSchema;