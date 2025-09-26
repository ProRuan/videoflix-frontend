import { TokenPageConfigOptions } from '@shared/interfaces';

export const DELETION_TOKEN: TokenPageConfigOptions = {
  error: {
    title: 'Token rejected',
    color: 'c-error',
    messages: [
      'This deletion link can no longer be used.',
      'Log in and sign out again.',
    ],
    primLabel: 'Go to login',
    primUrl: '/log-in',
  },
  success: {
    title: 'Account deleted',
    color: 'c-success',
    messages: [
      'Your account has been deleted.',
      'You can now go home or create a new account.',
    ],
    primLabel: 'Go to home',
    primUrl: '/',
    secLabel: 'Go to sign-up',
    secUrl: '/sign-up',
  },
};
