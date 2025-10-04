import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from '../../resources/enums/transaction-type.enum';

@Pipe({
  name: 'transactionSign',
  standalone: true,
})
export class TransactionSignPipe implements PipeTransform {
  transform(amount: number, type: TransactionType): number {
    if (type === TransactionType.WITHDRAWAL) {
      return -Math.abs(amount); // Ensure it's negative for withdrawal
    } else if (type === TransactionType.DEPOSIT) {
      return Math.abs(amount); // Ensure it's positive for deposit
    }
    return amount; // Return as is for other types or if type is not recognized
  }
}
