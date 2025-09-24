import { SuccessDialogConfig } from './success-dialog-config';

/**
 * Interface representing a success dialog catalog.
 */
export interface SuccessDialogCatalog {
  signUp: SuccessDialogConfig;
  reactivateAccount: SuccessDialogConfig;
  forgotPassword: SuccessDialogConfig;
  signOut: SuccessDialogConfig;
}
