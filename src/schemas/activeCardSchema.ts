import joi from 'joi';

const passwordRegex = /^[0-9]{4}$/;
const codeCvcRegex = /^[0-9]{3}$/;

const activeCardSchema = joi.object(
  {
    cardNumber: joi.string().required(),
    codeCvc: joi.string().regex(codeCvcRegex).required(),
    password: joi.string().regex(passwordRegex).required()
  }
);

export default activeCardSchema;