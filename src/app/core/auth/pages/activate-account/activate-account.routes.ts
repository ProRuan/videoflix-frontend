import { Routes } from '@angular/router';

import { ACTIVATION_TOKEN } from '@core/auth/constants';
import { tokenGuard } from '@core/auth/guards';
import { activationTokenResolver } from '@core/auth/resolvers';
import { TokenPage } from '@shared/components/pages';

import { ActivateAccount } from './activate-account';

export const activateAccountRoutes: Routes = [
  {
    path: 'error',
    component: TokenPage,
    data: { config: ACTIVATION_TOKEN.error },
  },
  {
    path: 'success',
    component: TokenPage,
    data: { config: ACTIVATION_TOKEN.success },
  },
  {
    path: ':token',
    component: ActivateAccount,
    data: { parent: 'activate-account' },
    canActivate: [tokenGuard],
    resolve: { token: activationTokenResolver },
  },
  { path: '**', redirectTo: 'bad-request' },
];
