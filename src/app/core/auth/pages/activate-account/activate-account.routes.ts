import { Routes } from '@angular/router';

import { tokenGuard } from '@core/auth/guards';
import { TokenResolver } from '@core/auth/resolvers';
import { TokenStatePage } from '@shared/components/pages';

import { ActivateAccount } from './activate-account';

export const activateAccountRoutes: Routes = [
  {
    path: 'error',
    component: TokenStatePage,
    data: { page: 'activateAccount', state: 'error' },
  },
  {
    path: 'success',
    component: TokenStatePage,
    data: { page: 'activateAccount', state: 'success' },
  },
  {
    path: ':token',
    component: ActivateAccount,
    canActivate: [tokenGuard],
    resolve: { response: TokenResolver },
  },
];
