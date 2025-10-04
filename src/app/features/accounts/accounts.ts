import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopNavbar } from '../../shared/components/top-navbar/top-navbar';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [RouterOutlet, TopNavbar],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class Accounts {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  onLogout() {
    this.localStorageService.removeItem('authToken');
    this.router.navigate(['/auth/login']);
  }
}
