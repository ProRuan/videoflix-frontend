import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { SKIP_AUTH } from '@core/http';
import { HttpContextOptions } from '@shared/interfaces';

import { environment } from '../../../environments/environment';

/**
 * Class representing a base store service.
 *
 * Provides POST, GET and DELETE for API requests.
 */
@Injectable({
  providedIn: 'root',
})
export class BaseStore {
  private http = inject(HttpClient);

  private readonly baseUrl = environment.apiBaseUrl;

  /**
   * Perform a POST request via API.
   * @param endpoint - The endpoint URL fragment.
   * @param payload - The payload for the endpoint.
   * @param options - The HTTP context options.
   * @returns An Observable with the specified response.
   */
  post<T, U>(endpoint: string, payload: T, options: HttpContextOptions = {}) {
    console.log('base URL: ', environment);

    const url = this.getEndpointUrl(endpoint);
    const context = this.getHttpContext(options);
    return this.http.post<U>(url, payload, { context });
  }

  /**
   * Get an endpoint URL:
   * @param segments - The URL segment array.
   * @returns The endpoint URL.
   */
  private getEndpointUrl(...segments: string[]) {
    return this.baseUrl + segments.join('/') + '/';
  }

  /**
   * Get a HTTP context.
   * @param options - The HTTP context options.
   * @returns The HTTP context.
   */
  private getHttpContext(options: HttpContextOptions = {}) {
    return new HttpContext().set(SKIP_AUTH, !!options.skipAuth);
  }

  /**
   * Perform a GET request via API.
   * @param segments - The endpoint segments array.
   * @param options - The HTTP context options.
   * @returns An Observable with the specified response.
   */
  get<T>(segments: string[], options: HttpContextOptions = {}) {
    const url = this.getEndpointUrl(...segments);
    const context = this.getHttpContext(options);
    return this.http.get<T>(url, { context });
  }

  /**
   * Perform a DELETE request via API.
   * @param endpoint - The endpoint URL fragment.
   * @param options - The HTTP context options.
   * @returns An Observable with the specified response.
   */
  delete<T>(endpoint: string, options: HttpContextOptions = {}) {
    const url = this.getEndpointUrl(endpoint);
    const context = this.getHttpContext(options);
    return this.http.delete<T>(url, { context });
  }
}
