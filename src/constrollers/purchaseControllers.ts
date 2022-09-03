import { Request, Response } from 'express';
import addPurchase from '../service/addPurchase';

export async function buy(req: Request, res: Response) {
  const {
    cardId,
    password,
    businessId,
    amount
  }:{
    cardId: number,
    password: string,
    businessId: number,
    amount: number
  } = req.body;

  try {
    await addPurchase(cardId, password, businessId, amount);

    res.sendStatus(200);
  } catch(err: any) {
    if(err.code === 'NotFound') return res.status(404).send(err.message);
    else if(err.code === 'Unprocessable') return res.status(422).send(err.message);
    else if(err.code === 'Unauthorized') return res.status(401).send(err.message);
    res.sendStatus(500);
  }
}