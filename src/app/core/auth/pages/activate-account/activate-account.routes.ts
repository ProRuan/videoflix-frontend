import { Routes } from '@angular/router';

import { ACTIVATION_TOKEN } from '@core/token/constants';
import { tokenGuard } from '@core/token/guards';
import { activationTokenResolver } from '@core/token/resolvers';
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
