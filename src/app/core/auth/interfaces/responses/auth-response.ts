import { UserResponse } from './user-response';

/**
 * Interface representing an authentication response.
 * @extends UserResponse
 */
export interface AuthResponse extends UserResponse {
  token: string;
}
