import connection from '../databases/postgres';

export interface Company {
  id: number;
  name: string;
  apiKey?: string;
}

export async function findByApiKey(apiKey: string) {
  const result = await connection.query<Company, [string]>(
    // eslint-disable-next-line quotes
    `SELECT * FROM companies WHERE "apiKey"=$1`,
    [apiKey]
  );

  return result.rows[0];
}
