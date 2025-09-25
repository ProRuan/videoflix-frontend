/**
 * Interface representing a toast configuration.
 */
export interface ToastConfig {
  status: number;
  messages: string[];
  label?: string;
  url?: string;
}
