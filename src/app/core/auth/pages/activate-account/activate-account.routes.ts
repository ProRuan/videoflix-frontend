import { Routes } from '@angular/router';

import { tokenGuard } from '@core/auth/guards';
import { TokenResolver } from '@core/auth/resolvers';

import { ActivateAccount } from './activate-account';
import { ActivateAccountError } from './activate-account-error/activate-account-error';
import { ActivateAccountSuccess } from './activate-account-success/activate-account-success';

export const activateAccountRoutes: Routes = [
  { path: 'error', component: ActivateAccountError },
  { path: 'success', component: ActivateAccountSuccess },
  {
    path: ':token',
    component: ActivateAccount,
    canActivate: [tokenGuard],
    resolve: { response: TokenResolver },
  },
];
