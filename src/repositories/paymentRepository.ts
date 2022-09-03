import connection from '../databases/postgres';

export interface Payment {
  id: number;
  cardId: number;
  businessId: number;
  timestamp: Date;
  amount: number;
}
export type PaymentWithBusinessName = Payment & { businessName: string };
export type PaymentInsertData = Omit<Payment, 'id' | 'timestamp'>;

export async function findByCardId(cardId: number) {
  const result = await connection.query<PaymentWithBusinessName, [number]>(
    `SELECT 
      payments.*,
      businesses.name as "businessName"
     FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
     WHERE "cardId"=$1
    `,
    [cardId]
  );

  return result.rows;
}

export async function getBalance(cardId: number) {
  const { rows: cardData } = await connection.query(
    `
    SELECT 
      COALESCE(SUM(recharges.amount), 0) - COALESCE(SUM(payments.amount), 0) AS balance
    FROM recharges
    LEFT JOIN payments
    ON recharges."cardId" = payments."cardId"
    WHERE recharges."cardId" = $1;
    `,
    [ cardId ]
  );

  return cardData[0];
}

export async function insert(paymentData: PaymentInsertData) {
  const { cardId, businessId, amount } = paymentData;

  connection.query<any, [number, number, number]>(
    // eslint-disable-next-line quotes
    `INSERT INTO payments ("cardId", "businessId", amount) VALUES ($1, $2, $3)`,
    [cardId, businessId, amount]
  );
}
