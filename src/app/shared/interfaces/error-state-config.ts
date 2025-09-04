/**
 * Interface representing an error state configuration.
 */
export interface ErrorStateConfig {
  status: string;
  title: string;
  messages: string[];
  primText: string;
  primRoute: string;
  secText?: string;
  secRoute?: string;
}
