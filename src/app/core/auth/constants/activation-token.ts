import { TokenPageConfigOptions } from '@shared/interfaces';

export const ACTIVATION_TOKEN: TokenPageConfigOptions = {
  error: {
    title: 'Token rejected',
    color: 'c-error',
    messages: [
      'This activation link can no longer be used.',
      'Request a new token or go to login.',
    ],
    primLabel: 'Get new token',
    primUrl: '/reactivate-account',
    secLabel: 'Go to login',
    secUrl: '/log-in',
  },
  success: {
    title: 'Account activated',
    color: 'c-success',
    messages: [
      'Your email has been confirmed.',
      'You can now log in with your account.',
    ],
    primLabel: 'Go to login',
    primUrl: '/log-in',
  },
};
