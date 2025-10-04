import { Component, computed, inject } from '@angular/core';
import { AccountListDisplay } from '../../components/account-list-display/account-list-display';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [AccountListDisplay],
  templateUrl: './account-list.html',
  styleUrl: './account-list.scss',
})
export class AccountList {
  private readonly accountsService = inject(AccountsService);

  private readonly accountsResource = this.accountsService.getAccounts();

  public error = computed(() => this.accountsResource.error());
  public loading = computed(() => this.accountsResource.isLoading());
  public accounts = computed(() => {
    if (this.accountsResource.hasValue()) {
      return this.accountsResource.value()?.data;
    }
    return [];
  });

  onReload() {
    this.accountsResource.reload();
  }
}
