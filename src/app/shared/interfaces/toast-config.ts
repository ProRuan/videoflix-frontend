/**
 * Interface representing a toast configuration.
 */
export interface ToastConfig {
  status: number;
  messages: string[];
  button?: {
    label: string;
    route: string;
  };
}
