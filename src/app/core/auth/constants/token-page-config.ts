import { TokenStatePageConfig } from '../interfaces';

export const TOKEN_PAGE_CONFIG: TokenStatePageConfig = {
  activateAccount: {
    error: {
      title: 'Token rejected',
      color: 'c-error',
      messages: [
        'This activation link can no longer be used.',
        'Request a new activation email or go to login.',
      ],
      primText: 'Request email',
      primRoute: '/reactivate-account',
      secText: 'Go to login',
      secRoute: '/log-in',
    },
    success: {
      title: 'Account activated',
      color: 'c-success',
      messages: [
        'Your email has been confirmed.',
        'You can now log in with your account.',
      ],
      primText: 'Go to login',
      primRoute: '/log-in',
    },
  },
  resetPassword: {
    error: {
      title: 'Token rejected',
      color: 'c-error',
      messages: [
        'This reset link can no longer be used.',
        'Request a new reset email or go to login.',
      ],
      primText: 'Request email',
      primRoute: '/forgot-password',
      secText: 'Go to login',
      secRoute: '/log-in',
    },
    success: {
      title: 'Password successfully reset',
      color: 'c-success',
      messages: [
        'Your password has been reset.',
        'You can now log in with your new password.',
      ],
      primText: 'Go to login',
      primRoute: '/log-in',
    },
  },
  deleteAccount: {
    error: {
      title: 'Token rejected',
      color: 'c-error',
      messages: [
        'This deletion link can no longer be used.',
        'Log in and request a new deletion email.',
      ],
      primText: 'Go to login',
      primRoute: '/log-in',
    },
    success: {
      title: 'Account deleted',
      color: 'c-success',
      messages: [
        'Your account has been deleted.',
        'You can now go home or create a new account.',
      ],
      primText: 'Go to home',
      primRoute: '/',
      secText: 'Go to sign-up',
      secRoute: '/sign-up',
    },
  },
};
