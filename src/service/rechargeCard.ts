import * as companyRepository from '../repositories/companyRepository';

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

export default async function recharge(companyKey: any, cardId: number) {
  await isApiKeyValid(companyKey);
}