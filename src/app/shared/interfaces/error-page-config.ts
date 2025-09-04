/**
 * Interface representing an error page configuration.
 */
export interface ErrorPageConfig {
  status: string;
  title: string;
  messages: string[];
  primText: string;
  primRoute: string;
  secText?: string;
  secRoute?: string;
}
