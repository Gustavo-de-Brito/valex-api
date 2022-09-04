import joi from 'joi';

const permissionCardSchema = joi.object(
  {
    cardId: joi.number().integer().required(),
    password: joi.string().required()
  }
);

export default permissionCardSchema;