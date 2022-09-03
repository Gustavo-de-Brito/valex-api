import * as cardRepository from '../repositories/cardRepository';

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
}

export default async function updateCard(
  cardNumber: string,
  codeCvc: string,
  cardHolderName: string,
  expirationDate: string,
  password: string
  ) {
  await isRegisteredCard(cardNumber, cardHolderName, expirationDate);
}