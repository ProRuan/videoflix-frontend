import { ErrorToastConfig } from './error-toast-config';

/**
 * Interface representing an error toast catalog.
 */
export interface ErrorToastCatalog {
  default: ErrorToastConfig;
  startsite: ErrorToastConfig;
  signUp: ErrorToastConfig;
  logIn: ErrorToastConfig;
  signOut: ErrorToastConfig;
}
