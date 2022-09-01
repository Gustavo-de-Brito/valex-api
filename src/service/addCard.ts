import * as companyRepository from '../repositories/companyRepository';

async function isApiKeyValid(xApiKey: any) {
  const company = await companyRepository.findByApiKey(xApiKey);

  if(!company) {
    const error = {
      code: 'NotFound',
      message: 'Não há nenhuma empresa registrada com esta API key'
    };

    throw error;
  }

  return company;
}

async function addCard(employeeId: number, cardType: string, xApiKey: any) {
  const company: object = await isApiKeyValid(xApiKey);
}

export default addCard;