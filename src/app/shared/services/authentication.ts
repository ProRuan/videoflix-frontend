import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  private http: HttpClient = inject(HttpClient);

  // clean this class ...
  // improve URLs and methods ...

  // adjust URL!!!
  private emailCheckUrl = 'http://127.0.0.1:8000/api/email-check/';
  private registrationUrl = 'http://127.0.0.1:8000/api/registration/';
  private loginUrl = 'http://127.0.0.1:8000/api/login/';
  private forgotPasswordUrl = 'http://127.0.0.1:8000/api/forgot-password/';
  private resetPasswordUrl = 'http://127.0.0.1:8000/api/reset-password/';
  private videoOfferUrl = 'http://127.0.0.1:8000/api/videos/';
  // parameter videoId ... !
  private videoDetailUrl = 'http://127.0.0.1:8000/api/videos/2/';

  checkEmail(payload: Record<string, string>) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ status: string }>(this.emailCheckUrl, payload, {
      headers,
    });
  }

  registerUser(payload: Record<string, string>): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.registrationUrl, payload, {
      headers,
      responseType: 'text' as 'json',
    });
  }

  logInUser(payload: Record<string, string>): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(this.loginUrl, payload, { headers });
  }

  resetPassword(payload: Record<string, string>) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(this.forgotPasswordUrl, payload, {
      headers,
    });
  }

  // token must be variable!
  updatePassword(payload: Record<string, string>) {
    payload['token'] = '5c7bca16673bd00e5a2eb98a65d609474121ce5e';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token 5c7bca16673bd00e5a2eb98a65d609474121ce5e',
    });
    return this.http.post<AuthResponse>(this.resetPasswordUrl, payload, {
      headers,
    });
  }

  loadVideoOffer() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token 5c7bca16673bd00e5a2eb98a65d609474121ce5e',
    });
    return this.http.get<any>(this.videoOfferUrl, { headers });
  }

  loadVideoDetail() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token 5c7bca16673bd00e5a2eb98a65d609474121ce5e',
    });
    return this.http.get<any>(this.videoDetailUrl, { headers });
  }
}
