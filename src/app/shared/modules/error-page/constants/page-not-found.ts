import { ErrorPageConfig } from '../interfaces';

export const PAGE_NOT_FOUND: ErrorPageConfig = {
  status: '404',
  title: 'Page not found',
  messages: [
    'We can’t find the page you’re looking for.',
    'Try checking the URL or use the button below to go home.',
  ],
  primText: 'Home',
  primRoute: '/',
};
