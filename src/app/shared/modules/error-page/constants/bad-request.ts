import { ErrorPageConfig } from '../interfaces';

export const BAD_REQUEST: ErrorPageConfig = {
  status: '400',
  title: 'Bad request',
  messages: [
    'The server received incomplete or invalid data.',
    'Try checking the URL or use the button below to go home.',
  ],
  primText: 'Home',
  primRoute: '/',
};
