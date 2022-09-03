import dayjs from 'dayjs';
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import * as cardRepository from '../repositories/cardRepository';

dotenv.config();

async function isRegisteredCard(
    cardNumber: string,
    cardHolderName: string,
    expirationDate: string,
  ) {
  const card = await cardRepository.findByCardDetails(
    cardNumber, cardHolderName, expirationDate
  );

  if(!card) {
    throw {
      code: 'NotFound',
      message: 'Não existe cartão compatível com os dados passados'
    };
  }

  return card;
}

function isCardExpired(expirationDate: string) {
  const currentDate = dayjs().format('MM/YY');

  if(expirationDate < currentDate) {
    throw {
      code: 'Unauthorized',
      message: 'Este cartão está expirado'
    };
  }
}

function isCardAlredyActive(password: any) {
  if(password) {
    throw {
      code: 'Conflict',
      message: 'O cartão já está ativo'
    };
  }
}

function isValidSecurityCode(securityCode: string, codeCvc: string) {
  const CRYPTR_KEY = process.env.CRYPTR_KEY || '';
    const cryptr = new Cryptr(CRYPTR_KEY);

    const decryptSecurityCode = cryptr.decrypt(securityCode);

    if(decryptSecurityCode !== codeCvc) {
      throw {
        code: 'Unauthorized',
        message: 'Os dados do cartão estão incorretos'
      };
    }
}

export default async function updateCard(
  cardNumber: string,
  codeCvc: string,
  cardHolderName: string,
  expirationDate: string,
  password: string
  ) {
    //validations
    const cardData = await isRegisteredCard(
      cardNumber, cardHolderName, expirationDate
    );
    isCardExpired(expirationDate);
    isCardAlredyActive(cardData.password);
    isValidSecurityCode(cardData.securityCode, codeCvc);

    const encryptedPassword = bcrypt.hashSync(password, 10);

    await cardRepository.update(
      cardData.id, {...cardData, password: encryptedPassword}
    );
}