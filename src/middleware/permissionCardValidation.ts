import { Request, Response, NextFunction } from 'express';
import permissionCardSchema from '../schemas/permissionCardSchema';

function permissionCardValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;

  const { error } = permissionCardSchema.validate(body, { abortEarly: false });

  if(error) {
    const errors:string[] = error.details.map(err => err.message);

    return res.status(422).send(errors);
  }

  next();
}

export default permissionCardValidation;