import { Themes } from '@shared/constants';

import { activateAccountRoutes } from './pages/activate-account/activate-account.routes';
import { deleteAccountRoutes } from './pages/delete-account/delete-account.routes';
import { resetPasswordRoutes } from './pages/reset-password/reset-password.routes';
import { signOutRoutes } from './pages/sign-out/sign-out.routes';

export const authData = {
  startsite: { theme: Themes.Startsite },
  signUp: { theme: Themes.SignUp },
  login: { theme: Themes.Login },
};

export const authChildrenRoutes = {
  activateAccount: activateAccountRoutes,
  resetPassword: resetPasswordRoutes,
  signOut: signOutRoutes,
  deleteAccount: deleteAccountRoutes,
};
