/**
 * Interface representing a token page configuration.
 */
export interface TokenPageConfig {
  title: string;
  color: string;
  messages: string[];
  primLabel: string;
  primUrl: string;
  secLabel?: string;
  secUrl?: string;
}
