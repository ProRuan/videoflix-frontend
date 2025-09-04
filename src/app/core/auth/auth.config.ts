import { Themes } from '@shared/constants';
import { PAGE_NOT_FOUND, UNAUTHORIZED } from '@shared/modules/error-page';

import { activateAccountRoutes } from './pages/activate-account/activate-account.routes';
import { deleteAccountRoutes } from './pages/delete-account/delete-account.routes';
import { resetPasswordRoutes } from './pages/reset-password/reset-password.routes';
import { signOutRoutes } from './pages/sign-out/sign-out.routes';

export const authData = {
  startsite: { theme: Themes.Startsite },
  signUp: { theme: Themes.SignUp },
  login: { theme: Themes.Login },
  unauthorized: { config: UNAUTHORIZED },
  pageNotFound: { config: PAGE_NOT_FOUND },
};

export const authChildrenRoutes = {
  activateAccount: activateAccountRoutes,
  resetPassword: resetPasswordRoutes,
  signOut: signOutRoutes,
  deleteAccount: deleteAccountRoutes,
};
