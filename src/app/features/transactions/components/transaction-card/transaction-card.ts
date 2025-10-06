import { Component, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TransactionSignPipe } from '../../../../core/pipes/transaction-sign.pipe';
import { TransactionTypeTranslatePipe } from '../../../../core/pipes/transaction-type-translate.pipe';
import { CustomCurrencyPipe } from '../../../../core/pipes/custom-currency.pipe';
import { Transaction } from '../../../../resources/interfaces/transaction.interface';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    TransactionSignPipe,
    TransactionTypeTranslatePipe,
  ],
  templateUrl: './transaction-card.html',
  styleUrl: './transaction-card.scss',
})
export class TransactionCard {
  transactionInfo = input.required<Transaction>();
}
