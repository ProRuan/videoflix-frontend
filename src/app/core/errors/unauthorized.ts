import { ErrorPageConfig } from '@shared/interfaces';

export const UNAUTHORIZED: ErrorPageConfig = {
  status: '401',
  title: 'Unauthorized',
  messages: [
    'Your session has ended or you don’t have access to this page.',
    'Please log in to continue.',
  ],
  primLabel: 'Log in',
  primUrl: '/log-in',
  secLabel: 'Home',
  secUrl: '/',
};
