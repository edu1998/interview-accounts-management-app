import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ApiResponse } from '../../../resources/interfaces/auth-response.interface';
import { AuthData } from '../../../resources/interfaces/auth-data.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly API_URL = `${environment.apiUrl}/auth`; // TODO: Replace with your actual API endpoint

  login(credentials: {
    username: string;
    pass: string;
  }): Observable<ApiResponse<AuthData>> {
    return this.http
      .post<ApiResponse<AuthData>>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((response) => {
          this.localStorageService.setItem(
            'authToken',
            response.data.access_token
          );
        })
      );
  }
}
