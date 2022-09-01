import { Request, Response } from 'express';
import addCard from '../service/addCard';

export async function createCard(req: Request, res: Response) {
  const { employeeId, cardType } = req.body;
  const xApiKey = req.headers['x-api-key'];

  try {
    await addCard(employeeId, cardType, xApiKey);

    res.sendStatus(503);
  } catch(err: any) {
    if(err.code === 'NotFound') return res.status(404).send(err.message);
    res.sendStatus(500);
  }
}