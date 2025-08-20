import { Observable } from 'rxjs';

import {
  EmailPayload,
  LoginPayload,
  PasswordPayload,
  RegistrationPayload,
  TokenPayload,
} from './payloads';
import { AuthResponse, EmailResponse, TokenCheckResponse } from './responses';

/**
 * Interface representing authentication requests.
 */
export interface AuthRequests {
  checkEmail(payload: EmailPayload): Observable<EmailResponse>;
  logIn(payload: LoginPayload): Observable<AuthResponse>;
  register(payload: RegistrationPayload): Observable<AuthResponse>;
  resetPassword(payload: EmailPayload): Observable<EmailResponse>;
  updatePassword(payload: PasswordPayload): Observable<AuthResponse>;
  checkToken(payload: TokenPayload): Observable<TokenCheckResponse>;
}
