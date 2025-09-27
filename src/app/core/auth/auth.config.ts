import { BAD_REQUEST, PAGE_NOT_FOUND, UNAUTHORIZED } from '@core/errors';

import { Themes } from './constants';
import {
  activateAccountRoutes,
  deleteAccountRoutes,
  resetPasswordRoutes,
  signOutRoutes,
} from './pages';

export const authData = {
  startsite: { theme: Themes.Startsite },
  signUp: { theme: Themes.SignUp },
  login: { theme: Themes.Login },
  badRequest: { config: BAD_REQUEST },
  unauthorized: { config: UNAUTHORIZED },
  pageNotFound: { config: PAGE_NOT_FOUND },
};

export const authChildrenRoutes = {
  activateAccount: activateAccountRoutes,
  resetPassword: resetPasswordRoutes,
  signOut: signOutRoutes,
  deleteAccount: deleteAccountRoutes,
};
