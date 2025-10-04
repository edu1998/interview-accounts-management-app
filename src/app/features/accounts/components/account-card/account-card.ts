import { Component, input } from '@angular/core';
import { Account } from '../../../../resources/interfaces/account.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLink],
  templateUrl: './account-card.html',
  styleUrl: './account-card.scss',
})
export class AccountCard {
  account = input.required<Account | undefined>();
  isClicked = input<boolean>(true);
}
