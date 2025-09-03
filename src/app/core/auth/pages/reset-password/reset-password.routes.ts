import { Routes } from '@angular/router';

import { tokenGuard } from '@core/auth/guards';
import { TokenResolver } from '@core/auth/resolvers';
import { TokenStatePage } from '@shared/components/pages';

import { ResetPassword } from './reset-password';

export const resetPasswordRoutes: Routes = [
  {
    path: 'error',
    component: TokenStatePage,
    data: { page: 'resetPassword', state: 'error' },
  },
  {
    path: 'success',
    component: TokenStatePage,
    data: { page: 'resetPassword', state: 'success' },
  },
  {
    path: ':token',
    component: ResetPassword,
    canActivate: [tokenGuard],
    resolve: { response: TokenResolver },
  },
];
