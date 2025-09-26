import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  Router,
} from '@angular/router';

import { catchError, map, of } from 'rxjs';

import { AuthResponse } from '@core/auth/interfaces';
import { AuthStore } from '@core/auth/services';
import { TokenStore } from '@core/token/services';
import { tokenPatterns } from '@shared/modules/form-validation';

/**
 * Class representing a route utils service.
 *
 * Provides methods for router guards and route data resolvers.
 */
@Injectable({
  providedIn: 'root',
})
export class RouteUtils {
  private router = inject(Router);
  private auth = inject(AuthStore);
  private tokens = inject(TokenStore);

  private readonly pattern: RegExp = tokenPatterns.token;

  /**
   * Check the route for containing a token parameter.
   * @param route - The ActivatedRouteSnapshot.
   * @param url - The alternative URL.
   * @returns True if the route contains a valid token,
   *          otherwise a URL tree for an alternative route.
   */
  hasToken(route: ActivatedRouteSnapshot, url: string) {
    if (this.isToken(route)) return true;
    return this.router.createUrlTree([`/${url}`]);
  }

  /**
   * Check a token by pattern.
   * @param route - The ActivatedRouteSnapshot.
   * @returns True if the token matches the pattern, otherwise false.
   */
  private isToken(route: ActivatedRouteSnapshot) {
    const token = this.getToken(route);
    return this.pattern.test(token);
  }

  /**
   * Get a token from the activated route.
   * @param route - The ActivatedRouteSnapshot.
   * @returns The token or an empty string.
   */
  private getToken(route: ActivatedRouteSnapshot) {
    return route.paramMap.get('token') ?? '';
  }

  /**
   * Resolve an authentication token.
   * @param route - The ActivatedRouteSnapshot.
   * @returns An Observable with email or redirect command.
   */
  resolveAuthToken(route: ActivatedRouteSnapshot) {
    this.setToken(route);
    return this.tokens.checkToken().pipe(
      map((data) => data['email']),
      catchError(() => this.redirect$('/unauthorized'))
    );
  }

  /**
   * Set the token by activated route.
   * @param route - The ActivatedRouteSnapshot.
   */
  private setToken(route: ActivatedRouteSnapshot) {
    const token = this.getToken(route);
    this.auth.setToken(token);
  }

  /**
   * Redirect to an alternative route.
   * @param url - The alternative URL.
   * @returns An Observable with a redirect command.
   */
  private redirect$(url: string) {
    const urlTree = this.router.parseUrl(url);
    const command = new RedirectCommand(urlTree);
    return of(command);
  }

  /**
   * Resolve a token.
   * @param route - The ActivatedRouteSnapshot.
   * @returns An Observable with string, number or redirect command.
   */
  resolveToken(
    route: ActivatedRouteSnapshot,
    key: keyof AuthResponse,
    hasPayload: boolean = false
  ) {
    const url = this.getErrorUrl(route);
    return this.request$(route, hasPayload).pipe(
      map((data) => data[key]),
      catchError(() => this.redirect$(url))
    );
  }

  /**
   * Get an error URL.
   * @param route - ActivatedRouteSnapshot.
   * @returns The error URL.
   */
  private getErrorUrl(route: ActivatedRouteSnapshot) {
    const parent = route.data['parent'] as string;
    return `/${parent}/error`;
  }

  /**
   * Request a token check from the Videoflix API.
   * @param route - The ActivatedRouteSnapshot.
   * @param hasPayload - A boolen value.
   * @returns An Observable with the authentication response.
   */
  private request$(route: ActivatedRouteSnapshot, hasPayload: boolean) {
    const token = this.getToken(route);
    this.auth.setToken(token);
    if (!hasPayload) return this.tokens.checkToken();
    return this.tokens.checkActivationToken(token);
  }
}
