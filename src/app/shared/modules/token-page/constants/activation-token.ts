import { TokenPageConfigOptions } from '../interfaces';

export const ACTIVATION_TOKEN: TokenPageConfigOptions = {
  error: {
    title: 'Token rejected',
    color: 'c-error',
    messages: [
      'This activation link can no longer be used.',
      'Request a new token or go to login.',
    ],
    primText: 'Get new token',
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
};
