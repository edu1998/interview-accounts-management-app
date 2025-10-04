import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../../../../resources/interfaces/transaction.interface';
import { TransactionType } from '../../../../resources/enums/transaction-type.enum';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.scss',
})
export class TransactionFormComponent {
  private readonly fb = inject(FormBuilder);

  transactionSubmitted = output<Omit<Transaction, 'id' | 'accountId'>>();

  transactionForm = this.fb.group({
    type: [TransactionType.DEPOSIT, Validators.required],
    amount: [10000, [Validators.required, Validators.min(1)]],
  });

  protected readonly TransactionType = TransactionType;

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;
      const newTransaction: Omit<Transaction, 'id' | 'accountId'> = {
        type: formValue.type as TransactionType,
        amount: formValue.amount as number,
      };
      this.transactionSubmitted.emit(newTransaction);
      this.transactionForm.reset({
        type: TransactionType.DEPOSIT,
        amount: 10000,
      });
    }
  }
}
