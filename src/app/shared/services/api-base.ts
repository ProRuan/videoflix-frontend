import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AuthResponse,
  EmailResponse,
  LoginPayload,
  PasswordPayload,
  RegistrationPayload,
} from '@core/auth/interfaces';
import { EmailPayload } from '@core/auth/interfaces';

type Endpoints =
  | 'email-check'
  | 'registration'
  | 'account-activation'
  | 'account-reactivation'
  | 'login'
  | 'logout'
  | 'forgot-password'
  | 'reset-password'
  | 'user-email'
  | 'deregistration'
  | 'account-deletion'
  | 'token/check'
  | 'videos';

type ResponseOf<T> = T extends
  | LoginPayload
  | PasswordPayload
  | RegistrationPayload
  ? AuthResponse
  : T extends EmailPayload
  ? EmailResponse
  : never;

/**
 * Class representing an API base service.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiBase {
  private http: HttpClient = inject(HttpClient);

  // work with environments dev/prod ... ?
  private readonly baseURL = 'http://127.0.0.1:8000/api/';
  private token: string = '';

  // use encodeURIComponent ... !
  private getURL(...segments: string[]) {
    return this.baseURL + segments.join('/') + '/';
  }

  private getOptions(tokenProvided: boolean = false) {
    return { headers: this.getHeaders(tokenProvided) };
  }

  // in use ... ?
  // HttpInterceptor ... ?
  private getHeaders(tokenProvided: boolean = false) {
    if (tokenProvided) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${this.token}`,
      });
    } else {
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  post<T>(endpoint: Endpoints, payload: T, tokenProvided: boolean = false) {
    const url = this.getURL(endpoint);
    const options = this.getOptions(tokenProvided);
    return this.http.post<ResponseOf<T>>(url, payload, options);
  }

  get(endpoint: Endpoints, id?: number) {
    const url = this.getDetailURL(endpoint, id);
    const options = this.getOptions(true);
    return this.http.get<any>(url, options);
  }

  private getDetailURL(endpoint: Endpoints, id?: number) {
    if (id) {
      return this.getURL(endpoint, id.toString());
    } else {
      return this.getURL(endpoint);
    }
  }
}
