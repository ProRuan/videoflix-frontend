import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AuthResponse,
  LoginPayload,
  PasswordPayload,
  RegistrationPayload,
} from '@core/auth/interfaces';
import { EmailPayload } from '@core/auth/interfaces';
import { EmailCheckResponse } from './authentication';

type Endpoints =
  | 'email-check'
  | 'registration'
  | 'login'
  | 'forgot-password'
  | 'reset-password'
  | 'videos';

// move + rename to xResponse ...
export type ResponseType<T> = T extends
  | RegistrationPayload
  | LoginPayload
  | PasswordPayload
  ? AuthResponse
  : T extends EmailPayload
  ? EmailCheckResponse
  : unknown;

@Injectable({
  providedIn: 'root',
})
export class ApiBase {
  private http: HttpClient = inject(HttpClient);

  private readonly baseURL = 'http://127.0.0.1:8000/api/';

  // use encodeURIComponent ... !
  private getURL(...segments: string[]) {
    return this.baseURL + segments.join('/') + '/';
  }

  private getOptions(tokenProvided: boolean = false) {
    return { headers: this.getHeaders(tokenProvided) };
  }

  // HttpInterceptor ... ?
  private getHeaders(tokenProvided: boolean = false) {
    if (tokenProvided) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token 5c7bca16673bd00e5a2eb98a65d609474121ce5e',
      });
    } else {
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
  }

  post<T>(endpoint: Endpoints, payload: T, tokenProvided: boolean = false) {
    const url = this.getURL(endpoint);
    const options = this.getOptions(tokenProvided);
    return this.http.post<ResponseType<T>>(url, payload, options);
  }

  get(endpoint: Endpoints, id?: number) {
    const url = this.getDetailURL(endpoint, id);
    const options = this.getOptions(true);
    return this.http.get<any>(url, options);
  }

  getDetailURL(endpoint: Endpoints, id?: number) {
    if (id) {
      return this.getURL(endpoint, id.toString());
    } else {
      return this.getURL(endpoint);
    }
  }
}
