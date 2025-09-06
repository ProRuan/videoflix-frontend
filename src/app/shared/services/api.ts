import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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

  // replace any
  post(endpoint: any, payload: any, token?: string) {
    const url = this.getUrl(endpoint);
    const options = this.getOptions(token);
    return this.http.post<any>(url, payload, options);
  }

  get(endpoint: any, id?: number, token?: string) {
    const url = this.getDetailUrl(endpoint, id);
    const options = this.getOptions(token);
    return this.http.get<any>(url, options);
  }

  private getDetailUrl(endpoint: any, id?: number) {
    if (id) {
      return this.getUrl(endpoint, id.toString());
    } else {
      return this.getUrl(endpoint);
    }
  }
}
