import { Routes } from '@angular/router';
import { Accounts } from './accounts';

export const ACCOUNTS_ROUTES: Routes = [
  {
    path: '',
    component: Accounts,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./pages/account-list/account-list').then(
            (cl) => cl.AccountList
          ),
      },
      {
        path: ':accountId',
        loadComponent: () =>
          import('./pages/account-details/account-details').then(
            (ad) => ad.AccountDetails
          ),
      },
    ],
  },
];
