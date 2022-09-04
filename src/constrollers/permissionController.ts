import { Request, Response } from 'express';

export async function blockCard(req: Request, res: Response) {
  try {
    res.sendStatus(200);
  } catch(err:any) {
    res.sendStatus(500);
  }
}