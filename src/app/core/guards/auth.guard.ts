import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';

export const AuthGuard: CanActivateFn = () => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  const authToken = localStorageService.getItem('authToken');

  if (authToken) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
