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

async function formatBalanceTransactions(cardId: number) {
  const balance = await paymentRepository.getBalance(cardId);
  const payments = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);

  const getBalanceTransactions = {
    balance: balance.balance,
    transactions: payments,
    recharges
  };

  return getBalanceTransactions;
}

async function getBalanceTransactions(cardId: number) {
  await isCardValid(cardId);

  return await formatBalanceTransactions(cardId);
}

export default getBalanceTransactions;