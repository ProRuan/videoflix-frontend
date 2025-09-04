import { TokenPageConfig } from './token-page-config';

/**
 * Interface representing a token state page configuration.
 */
export interface TokenStatePageConfig {
  activateAccount: TokenPageConfig;
  resetPassword: TokenPageConfig;
  deleteAccount: TokenPageConfig;
}
