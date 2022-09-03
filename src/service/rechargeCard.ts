import dayjs from 'dayjs';
import * as companyRepository from '../repositories/companyRepository';
import * as cardRepository from '../repositories/cardRepository';
import * as rechargeRepository from '../repositories/rechargeRepository';

async function isApiKeyValid(companyApiKey: any) {
  const company:object = await companyRepository.findByApiKey(companyApiKey);

  if(!company) {
    const error = {
      code: 'NotFound',
      message: 'Não há nenhuma empresa registrada com esta API key'
    };

    throw error;
  }
  
  return company;
}

async function isCardValid(cardId: number) {
  const cardData = await cardRepository.findById(cardId);

  if(!cardData) {
    throw {
      code: 'NotFound',
      message: 'Não há nenhum cartão cadastrado com esses dados'
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

export default async function recharge(
  companyKey: any,
  cardId: number,
  rechargeAmount: number
) {
  await isApiKeyValid(companyKey);
  const cardData: any = await isCardValid(cardId);
  isCardActiveded(cardData.password);
  isExpirationDateValid(cardData.expirationDate);

  await rechargeRepository.insert({ cardId, amount: rechargeAmount});
}