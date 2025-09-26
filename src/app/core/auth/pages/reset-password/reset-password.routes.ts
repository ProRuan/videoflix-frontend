import { Routes } from '@angular/router';

import { RESET_TOKEN } from '@core/auth/constants';
import { tokenGuard } from '@core/auth/guards';
import { tokenResolver } from '@core/auth/resolvers';
import { TokenPage } from '@shared/components/pages';

import { ResetPassword } from './reset-password';

export const resetPasswordRoutes: Routes = [
  {
    path: 'error',
    component: TokenPage,
    data: { config: RESET_TOKEN.error },
  },
  {
    path: 'success',
    component: TokenPage,
    data: { config: RESET_TOKEN.success },
  },
  {
    path: ':token',
    component: ResetPassword,
    data: { parent: 'reset-password' },
    canActivate: [tokenGuard],
    resolve: { email: tokenResolver },
  },
  { path: '**', redirectTo: 'bad-request' },
];
