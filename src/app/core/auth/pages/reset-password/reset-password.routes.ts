import { Routes } from '@angular/router';

import { tokenGuard } from '@core/auth/guards';
import { TokenResolver } from '@core/auth/resolvers';

import { ResetPassword } from './reset-password';
import { ResetPasswordError } from './reset-password-error/reset-password-error';
import { ResetPasswordSuccess } from './reset-password-success/reset-password-success';

export const resetPasswordRoutes: Routes = [
  { path: 'error', component: ResetPasswordError },
  { path: 'success', component: ResetPasswordSuccess },
  {
    path: ':token',
    component: ResetPassword,
    canActivate: [tokenGuard],
    resolve: { response: TokenResolver },
  },
];
