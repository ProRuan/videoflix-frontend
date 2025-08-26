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
  // activate account with different respnose type ... ?!
  // update email response ... !
  //   --> startsite with token response ... ?
  activateAccount(payload: TokenPayload): Observable<TokenCheckResponse>;
  checkEmail(payload: EmailPayload): Observable<EmailResponse>;
  checkToken(payload: TokenPayload): Observable<TokenCheckResponse>;
  deleteAccount(payload: TokenPayload): Observable<TokenCheckResponse>;
  deregister(payload: LoginPayload): Observable<AuthResponse>;
  logIn(payload: LoginPayload): Observable<AuthResponse>;
  reactivateAccount(payload: EmailPayload): Observable<EmailResponse>;
  register(payload: RegistrationPayload): Observable<AuthResponse>;
  resetPassword(payload: EmailPayload): Observable<EmailResponse>;
  updatePassword(payload: PasswordPayload): Observable<AuthResponse>;
  requestUserEmail(payload: TokenPayload): Observable<any>;
}
