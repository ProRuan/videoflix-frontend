import { Routes } from '@angular/router';

import { tokenGuard } from '@core/auth/guards';
import { TokenResolver } from '@core/auth/resolvers';
import { RESET_TOKEN, TokenPage } from '@shared/modules/token-page';

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
    resolve: { response: TokenResolver },
  },
  { path: '**', redirectTo: 'bad-request' },
];
