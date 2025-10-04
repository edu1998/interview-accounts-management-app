import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsService } from '../../services/accounts.service';
import { AccountCard } from '../../components/account-card/account-card';
import { TransactionService } from '../../../transactions/services/transaction.service';
import { TransactionListDisplay } from '../../../transactions/components/transaction-list-display/transaction-list-display';
import { Transaction } from '../../../../resources/interfaces/transaction.interface';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { TransactionFormComponent } from '../../../transactions/components/transaction-form/transaction-form';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [
    CommonModule,
    AccountCard,
    TransactionListDisplay,
    ModalComponent,
    TransactionFormComponent,
  ],
  templateUrl: './account-details.html',
  styleUrl: './account-details.scss',
})
export class AccountDetails {
  private readonly accountsService = inject(AccountsService);
  private readonly transactionService = inject(TransactionService);

  public readonly accountId = input.required<string>();
  public isModalOpen = signal(false);

  private readonly accountResource = this.accountsService.getAccountById(
    this.accountId
  );
  private readonly transactionsResource =
    this.transactionService.getTransactionsByAccountId(this.accountId);

  public readonly account = computed(() => {
    if (this.accountResource.hasValue()) {
      return this.accountResource.value()?.data;
    }
    return undefined;
  });

  public readonly transactions = computed<Transaction[]>(() => {
    if (this.transactionsResource.hasValue()) {
      return this.transactionsResource.value()?.data.reverse();
    }
    return [];
  });

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  handleTransactionSubmitted(
    newTransaction: Omit<Transaction, 'id' | 'accountId'>
  ): void {
    this.transactionService
      .createTransaction({
        ...newTransaction,
        accountId: this.accountId(),
      })
      .subscribe((res) => {
        console.log(res);
        this.transactionsResource.reload();
        this.closeModal();
      });
  }
}
