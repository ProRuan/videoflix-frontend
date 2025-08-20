/**
 * Interface representing a token check response.
 */
export interface TokenCheckResponse {
  token: string;
  type: string;
  user: number;
  email: string;
  used: boolean;
}
