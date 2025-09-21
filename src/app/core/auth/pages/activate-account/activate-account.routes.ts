import { Routes } from '@angular/router';

import { tokenGuard } from '@core/auth/guards';
import { TokenResolver } from '@core/auth/resolvers';
import { ACTIVATION_TOKEN, TokenPage } from '@shared/modules/token-page';

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
    resolve: { token: TokenResolver },
  },
  { path: '**', redirectTo: 'bad-request' },
];
