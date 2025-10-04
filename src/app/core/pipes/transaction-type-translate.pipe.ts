import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from '../../resources/enums/transaction-type.enum';

@Pipe({
  name: 'transactionTypeTranslate',
  standalone: true,
})
export class TransactionTypeTranslatePipe implements PipeTransform {
  transform(type: TransactionType): string {
    switch (type) {
      case TransactionType.DEPOSIT:
        return 'Depósito';
      case TransactionType.WITHDRAWAL:
        return 'Retiro';
      default:
        return type; // Return original if not recognized
    }
  }
}
