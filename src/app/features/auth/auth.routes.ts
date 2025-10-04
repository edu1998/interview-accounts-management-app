import { Routes } from '@angular/router';
import { Auth } from './auth';
import { noAuthGuard } from '../../core/guards/no-auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login').then((lc) => lc.Login),
        canActivate: [noAuthGuard],
      },
    ],
  },
];
