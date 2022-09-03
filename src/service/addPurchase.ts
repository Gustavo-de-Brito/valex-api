import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import * as cardRepository from '../repositories/cardRepository';
import * as businessRepository from '../repositories/businessRepository';
import * as paymentRepository from '../repositories/paymentRepository';

// card validation functions
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

async function doesCardHaveBalance(cardId:number, purchaseAmount: number) {
  const employeeBalance:any = await paymentRepository.getBalance(cardId);

  if(purchaseAmount > employeeBalance.balance) {
    throw {
      code: 'Unprocessable',
      message: 'Não há crédito suficiente para realizar a compra'
    };
  }
}

// business validation functions
async function isBusinessRegistered(businessId: number) {
  const businessData = await businessRepository.findById(businessId);

  if(!businessData) {
    throw {
      code: 'NotFound',
      message: 'Este comércio não está registrado'
    };
  }

  return businessData;
}

function sameCardBusinessType(cardType: string, businessType: string) {
  if(cardType !== businessType) {
    throw {
      code: 'Unauthorized',
      message: 'Este cartão não pode ser usado nesse tipo de estabelecimento'
    };
  }
}

async function addPurchase(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  // card validations
  const cardData:any = await isCardValid(cardId);
  isCardActiveded(cardData.password);
  isExpirationDateValid(cardData.expirationDate);
  isCardBlocked(cardData.isBlocked);
  isPasswordValid(cardData.password, password);
  await doesCardHaveBalance(cardData.id, amount);

  // business validations
  const businessData: any = await isBusinessRegistered(businessId);
  sameCardBusinessType(cardData.type, businessData.type);

  await paymentRepository.insert({ cardId, businessId, amount });
}

export default addPurchase;