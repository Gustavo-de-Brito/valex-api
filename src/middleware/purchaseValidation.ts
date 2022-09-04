import { Request, Response, NextFunction } from 'express';
import purchaseSchema from '../schemas/purchaseSchema';

function purchaseValidation(req: Request, res: Response, next: NextFunction) {
  const body = req.body;

  const { error } = purchaseSchema.validate(body, { abortEarly: false });

  if(error) {
    const errors: string[] = error.details.map(err => err.message);

    return res.status(422).send(errors);
  }

  next();
}

export default purchaseValidation;