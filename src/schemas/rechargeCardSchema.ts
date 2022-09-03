import joi from 'joi';

const rechargeCardSchema = joi.object(
  {
    rechargeAmount: joi.number().min(0.01).required()
  }
);

export default rechargeCardSchema;