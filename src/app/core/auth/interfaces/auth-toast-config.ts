import { ToastConfig } from '@shared/interfaces';

/**
 * Interface representing an authentication toast configuration.
 */
export interface AuthToastConfig {
  default: ToastConfig;
  startsite: ToastConfig;
  signUp: ToastConfig;
  logIn: ToastConfig;
  signOut: ToastConfig;
}
