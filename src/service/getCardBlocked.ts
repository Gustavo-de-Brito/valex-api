import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import * as cardRepository from '../repositories/cardRepository';

async function isCardValid(cardId: number) {
  const cardData = await cardRepository.findById(cardId);

  if(!cardData) {
    throw {
      code: 'Unauthorized',
      message: 'Os dados do cartão estão incorretos'
    };
  }

  return cardData;
}

function isExpirationDateValid(expirationDate: string) {
  const currentDate = dayjs().format('MM/YY');

  if(currentDate > expirationDate) {
    throw {
      code: 'Unauthorized',
      message: 'Esse cartão passou do prazo de validade'
    };
  }
}

function isCardBlocked(isBlocked: boolean) {
  if(isBlocked) {
    throw {
      code: 'Unprocessable',
      message: 'Esse cartão já está bloqueado'
    };
  }
}

function isPasswordValid(databasePassword: string, password: string) {
  const isValidPassword = bcrypt.compareSync(password, databasePassword ?? '');

  if(!isValidPassword) {
    throw {
      code: 'Unauthorized',
      message: 'Os dados do cartão estão incorretos'
    };
  }
}

async function getCardBlocked(cardId: number, password: string) {
  // card validations
  const cardData:any = await isCardValid(cardId);
  isExpirationDateValid(cardData.expirationDate);
  isCardBlocked(cardData.isBlocked);
  isPasswordValid(cardData.password, password);

  await cardRepository.blockCard(cardId);
}

export default getCardBlocked;