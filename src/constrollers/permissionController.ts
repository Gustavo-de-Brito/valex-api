import { Request, Response } from 'express';
import getCardBlocked from '../service/getCardBlocked';
import getCardUnblocked from '../service/getCardUnblocked';

export async function blockCard(req: Request, res: Response) {
  const { cardId, password }:{ cardId: number, password: string } = req.body;

  try {
    await getCardBlocked(cardId, password);

    res.sendStatus(200);
  } catch(err:any) {
    if(err.code === 'Unauthorized') return res.status(401).send(err.message);
    else if(err.code === 'Unprocessable') return res.status(422).send(err.message);

    res.sendStatus(500);
  }
}

export async function unblockCard(req: Request, res: Response) {
  const { cardId, password }:{ cardId: number, password: string } = req.body;

  try {
    await getCardUnblocked(cardId, password);

    res.sendStatus(200);
  } catch(err:any) {
    if(err.code === 'Unauthorized') return res.status(401).send(err.message);
    else if(err.code === 'Unprocessable') return res.status(422).send(err.message);

    res.sendStatus(500);
  }
}