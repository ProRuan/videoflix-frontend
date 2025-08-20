import { TitleMessageError } from './title-message-error';

/**
 * Interface representing token error meta data.
 */
export interface TokenErrorData {
  required: TitleMessageError;
  rejected: TitleMessageError;
}
