import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
import * as companyRepository from '../repositories/companyRepository';
import * as employeeRepository from '../repositories/employeeRepository';
import * as cardRepository from '../repositories/cardRepository';

dotenv.config();

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

async function isEmployeeValid(employeeId: number) {
  const employee:object = await employeeRepository.findById(employeeId);
  
  if(!employee) {
    const error = {
      code: 'NotFound',
      message: 'O empregado não foi encontrado'
    };
    
    throw error;
  }

  return employee;
}

async function employeeAlreadyHasCartType(employeeId: number, cardType: any) {
  const card: object = await cardRepository
  .findByTypeAndEmployeeId(cardType, employeeId);

  if(card) {
    const error = {
      code: 'Conflict',
      message: 'O empregado já possui um cartão desse tipo'
    };

    throw error;
  }
}

function generateEmployeeCardName(employee: any):string {
  const names = employee.fullName.split(' ');
  let cardName: string = names[0];

  for(let i = 1; i < (names.length - 1); i++) {
    if(names[i].length >= 3) cardName += ` ${names[i][0]}`;
  }

  cardName += ` ${names[names.length - 1]}`;

  return cardName;
}

function generateEncryptedCodeCvc(): string {
  const CRYPTR_KEY:string = process.env.CRYPTR_KEY ?? '';
  const cryptr = new Cryptr(CRYPTR_KEY);
  const codeCvc: string = faker.finance.creditCardCVV();
  const encryptCodeCvC: string = cryptr.encrypt(codeCvc);

  return encryptCodeCvC;
}

async function addCard(
  employeeId: number,
  cardType: string,
  isVirtual: boolean,
  companyApiKey: any
  ) {
  // validate company and employee data before create card
  await isApiKeyValid(companyApiKey);
  const employee: object = await isEmployeeValid(employeeId);
  await employeeAlreadyHasCartType(employeeId, cardType);
  
  const cardNumber: string = faker.finance.creditCardNumber();
  const encryptCodeCvC: string = generateEncryptedCodeCvc();
  const cardEmployeeName: string = generateEmployeeCardName( employee );

  // get current date and add 5 years in the specified format
  const expirationDate = dayjs().add(5, 'years').format('MM/YY');

  const cardData = {
    employeeId,
    number: cardNumber,
    cardholderName: cardEmployeeName,
    securityCode: encryptCodeCvC,
    expirationDate,
    isVirtual,
    isBlocked: false,
    type: cardType
  };

  await cardRepository.insert(cardData);
}

export default addCard;