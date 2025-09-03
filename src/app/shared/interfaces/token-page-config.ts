import { TokenStateConfig } from './token-state-config';

/**
 * Interface representing a page configuration of a token feedback component.
 */
export interface TokenPageConfig {
  error: TokenStateConfig;
  success: TokenStateConfig;
}
