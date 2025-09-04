/**
 * Interface representing a token page configuration.
 */
export interface TokenPageConfig {
  title: string;
  color: string;
  messages: string[];
  primText: string;
  primRoute: string;
  secText?: string;
  secRoute?: string;
}
