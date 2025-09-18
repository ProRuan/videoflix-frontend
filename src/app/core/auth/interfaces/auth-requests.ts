import { Observable } from 'rxjs';

import {
  EmailPayload,
  LoginPayload,
  RegistrationPayload,
  TokenPayload,
} from './payloads';
import {
  AuthResponse,
  EmailResponse,
  RegistrationResponse,
  UserResponse,
} from './responses';

/**
 * Interface representing authentication requests.
 */
export interface AuthRequests {
  checkEmail(payload: EmailPayload): Observable<EmailResponse>;
  register(payload: RegistrationPayload): Observable<RegistrationResponse>;
  activateAccount(payload: TokenPayload): Observable<RegistrationResponse>;
  reactivateAccount(payload: EmailPayload): Observable<EmailResponse>;
  logIn(payload: LoginPayload): Observable<AuthResponse>;
  resetPassword(payload: EmailPayload): Observable<EmailResponse>;
  updatePassword(payload: RegistrationPayload): Observable<UserResponse>;
  deregister(payload: LoginPayload): Observable<EmailResponse>;
  deleteAccount(): Observable<void>;
}
