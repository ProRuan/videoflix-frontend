import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface RegistrationPayload {
  email: string;
  password: string;
  repeated_password: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  username: string;
  email: string;
  user_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  private http: HttpClient = inject(HttpClient);

  // adjust URL!!!
  private registrationUrl = 'http://127.0.0.1:8000/api/registration/';
  private loginUrl = 'http://127.0.0.1:8000/api/login/';

  registerUser(payload: RegistrationPayload): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.registrationUrl, payload, {
      headers,
      responseType: 'text' as 'json',
    });
  }

  loginUser(payload: LoginPayload): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(this.loginUrl, payload, { headers });
  }
}
