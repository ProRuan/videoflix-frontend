import { UserResponse } from './user-response';

/**
 * Interface representing a registration response.
 * @extends UserResponse
 */
export interface RegistrationResponse extends UserResponse {
  is_active: boolean;
}
