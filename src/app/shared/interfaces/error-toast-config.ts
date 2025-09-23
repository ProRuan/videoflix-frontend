export interface ErrorToastConfig {
  status: number;
  messages: string[];
  button?: {
    label: string;
    route: string;
  };
}
