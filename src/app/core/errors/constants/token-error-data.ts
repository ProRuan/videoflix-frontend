import { TokenErrorData } from '../interfaces';

export const tokenErrorData: TokenErrorData = {
  required: {
    title: 'Token required',
    message: 'You must provide a token.',
  },
  rejected: {
    title: 'Token rejected',
    message: 'This token cannot be used.',
  },
};
