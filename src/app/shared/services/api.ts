import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AuthResponse,
  EmailPayload,
  EmailResponse,
  LoginPayload,
  RegistrationPayload,
} from '@core/auth/interfaces';
import { SKIP_AUTH } from '@core/http';

type Endpoints =
  | 'email-check'
  | 'registration'
  | 'account-activation'
  | 'account-reactivation'
  | 'login'
  | 'logout'
  | 'password-reset'
  | 'password-update'
  | 'user-email'
  | 'deregistration'
  | 'account-deletion'
  | 'token/activation-token-check'
  | 'token/token-check'
  | 'videos';

type ResponseOf<T> = T extends
  | LoginPayload
  | RegistrationPayload
  | RegistrationPayload
  ? AuthResponse
  : T extends EmailPayload
  ? EmailResponse
  : never;

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);

  private readonly baseUrl = 'http://127.0.0.1:8000/api/';

  constructor() {}

  private getUrl(...segments: string[]) {
    return this.baseUrl + segments.join('/') + '/';
  }

  private getOptions(token?: string) {
    return { headers: this.getHeaders(token) };
  }

  private getHeaders(token?: string) {
    const config = this.getHeadersConfig(token);
    return new HttpHeaders(config);
  }

  private getHeadersConfig(token?: string): { [name: string]: string } {
    if (token) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      };
    } else {
      return { 'Content-Type': 'application/json' };
    }
  }

  post<T>(endpoint: Endpoints, payload: T, opts: { skipAuth?: boolean } = {}) {
    const url = this.getUrl(endpoint);
    const context = new HttpContext().set(SKIP_AUTH, !!opts.skipAuth);
    return this.http.post<ResponseOf<Endpoints>>(url, payload, { context });
  }

  // think about sequence of id and token
  get(endpoint: Endpoints, id?: number, opts: { skipAuth?: boolean } = {}) {
    const url = this.getDetailUrl(endpoint, id);
    const context = new HttpContext().set(SKIP_AUTH, !!opts.skipAuth);
    return this.http.get<any>(url, { context });
  }

  private getDetailUrl(endpoint: Endpoints, id?: number) {
    if (id) {
      return this.getUrl(endpoint, id.toString());
    } else {
      return this.getUrl(endpoint);
    }
  }

  // replace options with context ...
  // replace any
  delete<T>(endpoint: Endpoints, token: string) {
    const url = this.getUrl(endpoint);
    const options = this.getOptions(token);
    return this.http.delete<ResponseOf<Endpoints>>(url, options);
  }
}
