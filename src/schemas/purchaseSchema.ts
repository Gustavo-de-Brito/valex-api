import joi from 'joi';

const purchaseSchema = joi.object(
  {
    cardId: joi.number().required(),
    password: joi.string().required(),
    businessId: joi.number().required(),
    amount: joi.number().integer().min(1).required()
  }
);

export default purchaseSchema;