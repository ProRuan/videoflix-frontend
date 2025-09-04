import { ErrorStateConfig } from './error-state-config';

/**
 * Interface representing an error page configuration.
 */
export interface ErrorPageConfig {
  unauthorized: ErrorStateConfig;
  pageNotFound: ErrorStateConfig;
}
