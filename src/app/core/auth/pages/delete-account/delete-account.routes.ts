import { Routes } from '@angular/router';

import { tokenGuard } from '@core/auth/guards';
import { TokenResolver } from '@core/auth/resolvers';

import { DeleteAccount } from './delete-account';
import { DeleteAccountError } from './delete-account-error/delete-account-error';
import { DeleteAccountSuccess } from './delete-account-success/delete-account-success';

export const deleteAccountRoutes: Routes = [
  { path: 'error', component: DeleteAccountError },
  { path: 'success', component: DeleteAccountSuccess },
  {
    path: ':token',
    component: DeleteAccount,
    canActivate: [tokenGuard],
    resolve: { response: TokenResolver },
  },
];
