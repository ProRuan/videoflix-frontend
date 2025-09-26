/**
 * Interface representing an error page configuration.
 */
export interface ErrorPageConfig {
  status: string;
  title: string;
  messages: string[];
  primLabel: string;
  primUrl: string;
  secLabel?: string;
  secUrl?: string;
}
