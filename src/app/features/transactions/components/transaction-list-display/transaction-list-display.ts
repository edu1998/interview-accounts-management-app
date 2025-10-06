import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../../resources/interfaces/transaction.interface';
import { TransactionCard } from '../transaction-card/transaction-card';

@Component({
  selector: 'app-transaction-list-display',
  standalone: true,
  imports: [CommonModule, TransactionCard],
  templateUrl: './transaction-list-display.html',
  styleUrl: './transaction-list-display.scss',
})
export class TransactionListDisplay {
  transactions = input.required<Transaction[]>();
}
