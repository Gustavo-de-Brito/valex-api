import { Request, Response } from 'express';

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
    res.sendStatus(200);
  } catch(err: any) {
    res.sendStatus(500);
  }
}