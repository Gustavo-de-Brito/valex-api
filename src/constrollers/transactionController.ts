import { Request, Response } from 'express';
import recharge from '../service/rechargeCard';

export async function rechargeCard(req: Request, res: Response) {
  const companyKey = req.headers['x-api-key'];
  const cardId = Number(req.params.id);
  const { rechargeAmount }:{ rechargeAmount:number } = req.body;

  try {
    await recharge(companyKey, cardId, rechargeAmount);

    res.sendStatus(200);
  } catch(err: any) {
    if(err.code === 'NotFound') return res.status(404).send(err.message);
    else if(err.code === 'Unprocessable') return res.status(422).send(err.message);
    else if(err.code === 'Unauthorized') return res.status(401).send(err.message);
    res.sendStatus(500);
  }
}