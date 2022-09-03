import { Request, Response } from 'express';
import addCard from '../service/addCard';
import updateCard from '../service/updateCard';

export async function createCard(req: Request, res: Response) {
  const { employeeId, cardType, isVirtual } = req.body;
  const companyApiKey = req.headers['x-api-key'];

  try {
    await addCard(employeeId, cardType, isVirtual, companyApiKey);

    res.sendStatus(201);
  } catch(err: any) {
    if(err.code === 'NotFound') return res.status(404).send(err.message);
    else if(err.code === 'Conflict') return res.status(409).send(err.message);
    res.sendStatus(500);
  }
}

export async function activeCard(req: Request, res: Response) {
  const { 
    cardNumber, 
    codeCvc, 
    cardHolderName, 
    expirationDate, 
    password
  }
  : 
  {
    cardNumber: string,
    codeCvc: string,
    cardHolderName: string,
    expirationDate: string,
    password: string
  } = req.body;

  try{
    await updateCard(cardNumber, codeCvc, cardHolderName, expirationDate, password);

    res.sendStatus(503);
  } catch(err: any) {
    if(err.code === 'NotFound') return res.status(404).send(err.message);
    res.sendStatus(500);
  }
}