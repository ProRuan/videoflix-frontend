import { ErrorPageConfig } from '@shared/interfaces';

export const VIDEO_NOT_FOUND: ErrorPageConfig = {
  status: '404',
  title: 'Video not found',
  messages: [
    'We can’t find the video you’re looking for.',
    'Try checking the URL or go back to the video offer',
  ],
  primLabel: 'Video offer',
  primUrl: '/video/offer/:token',
};
