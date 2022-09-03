import { Request, Response, NextFunction } from 'express';
import activeCardSchema from '../schemas/activeCardSchema';

function activeCardValidation(req: Request, res: Response, next: NextFunction) {
  const body = req.body;

  const { error } = activeCardSchema.validate(body, {abortEarly: false});

  if(error) {
    const errors: string[] = error.details.map(err => err.message);

    return res.status(422).send(errors);
  }

  next();
}

export default activeCardValidation;