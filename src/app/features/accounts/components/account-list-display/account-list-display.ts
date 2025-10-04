import { Component, input } from '@angular/core';
import { Account } from '../../../../resources/interfaces/account.interface';
import { AccountCard } from '../account-card/account-card';

@Component({
  selector: 'app-account-list-display',
  standalone: true,
  imports: [AccountCard],
  templateUrl: './account-list-display.html',
  styleUrl: './account-list-display.scss',
})
export class AccountListDisplay {
  accounts = input<Account[] | undefined>([]);
  error = input();
  isLoading = input(false);
}
