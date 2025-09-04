import { ErrorPageConfig } from '@shared/interfaces';

export const ERROR_PAGE_CONFIG: Record<string, ErrorPageConfig> = {
  unauthorized: {
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
  },
  pageNotFound: {
    status: '404',
    title: 'Page not found',
    messages: [
      'We can’t find the page you’re looking for.',
      'Try checking the URL or use the button below to go home.',
    ],
    primText: 'Home',
    primRoute: '/',
  },
};
