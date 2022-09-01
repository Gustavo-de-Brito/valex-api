import { Request, Response, NextFunction } from 'express';
import createCardSchema from '../schemas/createCardSchema';

function createCardValidation(
  req: Request, res: Response, next: NextFunction
  ) {
  const body = req.body;

  const { error } = createCardSchema.validate(body, { abortEarly: false });

  if(error) {
    const errors: string[] = error.details.map(err => err.message);
    return res.status(422).send(errors);
  }

  next();
}

export default createCardValidation;