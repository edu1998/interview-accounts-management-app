import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../../resources/interfaces/transaction.interface';
import { TransactionSignPipe } from '../../../../core/pipes/transaction-sign.pipe';
import { TransactionTypeTranslatePipe } from '../../../../core/pipes/transaction-type-translate.pipe';
import { TransactionCard } from '../transaction-card/transaction-card';

@Component({
  selector: 'app-transaction-list-display',
  standalone: true,
  imports: [
    CommonModule,
    TransactionSignPipe,
    TransactionTypeTranslatePipe,
    TransactionCard,
  ],
  templateUrl: './transaction-list-display.html',
  styleUrl: './transaction-list-display.scss',
})
export class TransactionListDisplay {
  transactions = input.required<Transaction[]>();
}
