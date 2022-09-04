import dayjs from 'dayjs';
import * as cardRepository from '../repositories/cardRepository';
import * as paymentRepository from '../repositories/paymentRepository';
import * as rechargeRepository from '../repositories/rechargeRepository';

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

function formatObjectData(objectArray: any) {
  const formatedObjects = [];

  for(let i = 0; i < objectArray.length; i++) {
    const timeFormated = dayjs(objectArray[i].timestamp).format('DD/MM/YYYY');
    formatedObjects.push({...objectArray[i], timestamp: timeFormated});
  }

  return formatedObjects;
}

async function formatBalanceTransactions(cardId: number) {
  const balance = await paymentRepository.getBalance(cardId);
  const payments = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);

  const formatedPayments = formatObjectData(payments);
  const formatedRecharges = formatObjectData(recharges);

  const getBalanceTransactions = {
    balance: balance.balance,
    transactions: formatedPayments,
    recharges: formatedRecharges
  };

  return getBalanceTransactions;
}

async function getBalanceTransactions(cardId: number) {
  await isCardValid(cardId);

  return await formatBalanceTransactions(cardId);
}

export default getBalanceTransactions;