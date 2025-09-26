import { TokenPageConfigOptions } from '@shared/interfaces';

export const RESET_TOKEN: TokenPageConfigOptions = {
  error: {
    title: 'Token rejected',
    color: 'c-error',
    messages: [
      'This reset link can no longer be used.',
      'Request a new token or go to login.',
    ],
    primLabel: 'Get new token',
    primUrl: '/forgot-password',
    secLabel: 'Go to login',
    secUrl: '/log-in',
  },
  success: {
    title: 'Password successfully reset',
    color: 'c-success',
    messages: [
      'Your password has been reset.',
      'You can now log in with your new password.',
    ],
    primLabel: 'Go to login',
    primUrl: '/log-in',
  },
};
