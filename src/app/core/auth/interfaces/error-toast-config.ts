/**
 * Interface representing an error toast configuration.
 */
export interface ErrorToastConfig {
  status: number;
  messages: string[];
  button?: {
    label: string;
    route: string;
  };
}
