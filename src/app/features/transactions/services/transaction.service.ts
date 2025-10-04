import { inject, Injectable, Signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import { ApiResponse } from '../../../resources/interfaces/auth-response.interface';
import { Transaction } from '../../../resources/interfaces/transaction.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/transactions`;

  public getTransactionsByAccountId(accountId: Signal<string>) {
    return httpResource<ApiResponse<Transaction[]>>(() => ({
      url: `${this.API_URL}/account/${accountId()}`,
    }));
  }

  public createTransaction(
    transaction: Omit<Transaction, 'id'>
  ): Observable<ApiResponse<Transaction>> {
    return this.http.post<ApiResponse<Transaction>>(this.API_URL, transaction);
  }
}
