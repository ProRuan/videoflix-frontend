import { ErrorPageConfig } from '../interfaces';

export const UNAUTHORIZED: ErrorPageConfig = {
  status: '401',
  title: 'Unauthorized',
  messages: [
    'Your session has ended or you don’t have access to this page.',
    'Please log in to continue.',
  ],
  primText: 'Log in',
  primRoute: '/log-in',
  secText: 'Home',
  secRoute: '/',
};
