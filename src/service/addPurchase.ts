import dayjs from 'dayjs';
import * as cardRepository from '../repositories/cardRepository';
import bcrypt from 'bcrypt';

async function isCardValid(cardId: number) {
  const cardData = await cardRepository.findById(cardId);

  if(!cardData) {
    throw {
      code: 'NotFound',
      message: 'Os dados do cartão estão incorretos'
    };
  }

  return cardData;
}

function isCardActiveded(password: string) {
  if(!password) {
    throw {
      code: 'Unprocessable',
      message: 'Esse cartão ainda não foi ativado'
    };
  }
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
      message: 'Esse cartão está bloqueado'
    };
  }
}

function isPasswordValid(databasePassword: string, password: string) {
  const isValidPassword = bcrypt.compareSync(password, databasePassword);

  if(!isValidPassword) {
    throw {
      code: 'Unauthorized',
      message: 'Os dados do cartão estão incorretos'
    };
  }
}

async function addPurchase(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  const cardData:any = await isCardValid(cardId);
  isCardActiveded(cardData.password);
  isExpirationDateValid(cardData.expirationDate);
  isCardBlocked(cardData.isBlocked);
  isPasswordValid(cardData.password, password);
}

export default addPurchase;