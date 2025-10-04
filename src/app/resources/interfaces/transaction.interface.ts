import { TransactionType } from '../enums/transaction-type.enum';

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
}
