import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationPayload } from '../interfaces/registration-payload';
import { LogInPayload } from '../interfaces/log-in-payload';
import { AuthResponse } from '../interfaces/auth-response';
import { ForgotPasswordPayload } from '../interfaces/forgot-password-payload';
import { ResetPasswordPayload } from '../interfaces/reset-password-payload';

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  private http: HttpClient = inject(HttpClient);

  // adjust URL!!!
  private registrationUrl = 'http://127.0.0.1:8000/api/registration/';
  private loginUrl = 'http://127.0.0.1:8000/api/login/';
  private forgotPasswordUrl = 'http://127.0.0.1:8000/api/forgot-password/';
  private resetPasswordUrl = 'http://127.0.0.1:8000/api/reset-password/';

  registerUser(payload: RegistrationPayload): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.registrationUrl, payload, {
      headers,
      responseType: 'text' as 'json',
    });
  }

  logInUser(payload: LogInPayload): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(this.loginUrl, payload, { headers });
  }

  requestPasswordReset(payload: ForgotPasswordPayload) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(this.forgotPasswordUrl, payload, {
      headers,
    });
  }

  updateUserPassword(payload: ResetPasswordPayload) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(this.resetPasswordUrl, payload, {
      headers,
    });
  }
}
