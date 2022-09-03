import joi from 'joi';

const rechargeCardSchema = joi.object(
  {
    rechargeAmount: joi.number().integer().min(1).required()
  }
);

export default rechargeCardSchema;