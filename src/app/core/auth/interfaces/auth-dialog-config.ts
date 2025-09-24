import { DialogConfig } from '@shared/interfaces';

/**
 * Interface representing an authentication dialog configuration.
 */
export interface AuthDialogConfig {
  signUp: DialogConfig;
  reactivateAccount: DialogConfig;
  forgotPassword: DialogConfig;
  signOut: DialogConfig;
}
