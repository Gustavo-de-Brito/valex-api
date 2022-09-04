import { Request, Response, NextFunction } from 'express';
import rechargeCardSchema from '../schemas/rechargeCardSchema';

function rechargeCardValidation(req: Request, res: Response, next: NextFunction) {
  const body = req.body;

  const { error } = rechargeCardSchema.validate(body, { abortEarly: false });

  if(error) {
    const errors = error.details.map(err => err.message);

    return res.status(422).send(errors);
  }

  next();
}

export default rechargeCardValidation;