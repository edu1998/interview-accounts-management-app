import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if (localStorageService.getItem('authToken')) {
    // User is logged in, redirect to accounts page
    return router.createUrlTree(['/accounts']);
  }

  // User is not logged in, allow access to the route
  return true;
};
