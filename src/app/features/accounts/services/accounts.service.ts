import { Injectable, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Account } from '../../../resources/interfaces/account.interface';
import { ApiResponse } from '../../../resources/interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private readonly API_URL = `${environment.apiUrl}/accounts`;

  public getAccounts() {
    return httpResource<ApiResponse<Account[]>>(() => ({
      url: this.API_URL,
    }));
  }

  public getAccountById(id: Signal<string>) {
    return httpResource<ApiResponse<Account>>(() => ({
      url: `${this.API_URL}/${id()}`,
    }));
  }
}
