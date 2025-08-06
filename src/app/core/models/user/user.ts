import { AuthResponse } from 'shared/interfaces/auth-response';

/**
 * Class representing a user.
 */
export class User {
  token: string = '';
  email: string = '';
  id: number = 0;

  /**
   * Set the authentication data of a user.
   * @param response - The response data returned after a successful log-in.
   */
  setAuthData(response: AuthResponse) {
    this.token = response.token;
    this.email = response.email;
    this.id = response.user_id;
  }

  reset() {
    this.token = '';
    this.email = '';
    this.id = 0;
  }
}
