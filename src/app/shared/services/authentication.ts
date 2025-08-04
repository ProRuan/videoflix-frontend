import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';

// think about this ...
type StringMap = Record<string, string>;

// improve this ...
export interface EmailCheckResponse {
  response: string;
}

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  private http: HttpClient = inject(HttpClient);

  // clean this class ...
  // improve URLs and methods ...

  // think about interfaces, e. g. check-email { response: ok } ...
  // replace any type ...
  // check AuthResponse ...

  // apply this pattern "repeated_password" --> "repeatedPassword" for video object ... ?!

  // call it AuthenticationService or Authenticator ...
  // simplify method names ...
  //   e. g. logIn, register, getVideos, getVideoById ...
  //   e. g. requestPasswordReset, confirmPasswordReset ...
  // avoid any - use interfaces: RegistrationResponse, VideoSummary, VideoDetail ...

  // call it payload, body or credentials ...
  // replace StringMap with single parameters ... ?
  // normalize Json keys (snake --> camel) ...
  // use environment for base url ...

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

  checkEmail(payload: StringMap) {
    const url = this.getURL('email-check');
    const options = this.getOptions();
    return this.http.post<EmailCheckResponse>(url, payload, options);
  }

  registerUser(payload: StringMap) {
    const url = this.getURL('registration');
    const options = this.getOptions();
    return this.http.post<any>(url, payload, options);
  }

  logInUser(payload: StringMap): Observable<AuthResponse> {
    const url = this.getURL('login');
    const options = this.getOptions();
    return this.http.post<AuthResponse>(url, payload, options);
  }

  resetPassword(payload: StringMap) {
    const url = this.getURL('forgot-password');
    const options = this.getOptions();
    return this.http.post<AuthResponse>(url, payload, options);
  }

  // token must be variable!
  // think about payload!
  updatePassword(payload: StringMap) {
    payload['token'] = '5c7bca16673bd00e5a2eb98a65d609474121ce5e';
    const url = this.getURL('reset-password');
    const options = this.getOptions(true);
    return this.http.post<AuthResponse>(url, payload, options);
  }

  // loadVideoOffer() {
  //   const url = this.getURL('videos');
  //   const options = this.getOptions(true);
  //   return this.http.get<any>(url, options);
  // }

  // loadVideoDetail(id: number) {
  //   const url = this.getURL('videos', String(id));
  //   const options = this.getOptions(true);
  //   return this.http.get<any>(url, options);
  // }
}
