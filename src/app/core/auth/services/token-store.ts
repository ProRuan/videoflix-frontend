import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  Router,
} from '@angular/router';

import { catchError, map, Observable, of } from 'rxjs';

import { tokenPatterns } from '@shared/modules/form-validation';

import { AuthResponse } from '../interfaces';
import { AuthStore } from './auth-store';

/**
 * Class representing a token store service.
 */
@Injectable({
  providedIn: 'root',
})
export class TokenStore {
  private router = inject(Router);
  private auth = inject(AuthStore);

  // auth pages, e. g. video/offer/:token should just have 401 ... ?!
  // only activate-account and activation-token-check can have 400 ... ?!

  // 1. error interceptors are for global use ...
  //     --> let guard and resolver handle the specific error cases / pages ...
  // 2. review token check and activation token check, no login check (0/3) ...
  // 3. simple guard check, mapped resolver check (errors -> pages) ...
  // 4. do not save short-lived token at auth store ... ?!

  private readonly pattern = tokenPatterns.token;

  /**
   * Perform a token check.
   * @param route - The ActivatedRouteSnapshot.
   * @param segments - The URL segments.
   * @returns True or a URL tree.
   */
  hasToken(route: ActivatedRouteSnapshot, segments: string[]) {
    const token = this.getRouteParam(route, 'token');
    this.auth.setToken(token);
    if (this.isToken(token)) return true;
    return this.router.createUrlTree(segments);
  }

  /**
   * Get a parameter from an activated route snapshot.
   * @param route - The ActivatedRouteSnapshot.
   * @param name - The parameter name.
   * @returns The parameter or an empty string.
   */
  private getRouteParam(
    route: ActivatedRouteSnapshot,
    name: string,
    defaultValue: string = ''
  ) {
    return route.paramMap.get(name) ?? defaultValue;
  }

  /**
   * Check a token by pattern.
   * @param token - The token to be tested.
   * @returns A boolean value.
   */
  private isToken(token: string) {
    return this.pattern.test(token);
  }

  /**
   * Resolve a token parameter to get a token check response.
   * @param route - The ActivatedRouteSnapshot.
   * @returns The token check response or a redirect command.
   */
  resolveToken(
    route: ActivatedRouteSnapshot
  ): Observable<AuthResponse | RedirectCommand> {
    const token = this.getRouteParam(route, 'token');
    const payload = this.getTokenPayload(token);
    const url = this.getErrorUrl(route);
    console.log('parent: ', route.parent?.url[0].path);
    const parent = route.parent?.url[0].path;
    if (parent === 'activate-account') {
      return this.auth.checkActivationToken(token).pipe(
        map((data) => data['token']),
        catchError(() => this.getRedirectCommand(url))
      );
    }

    return this.auth.checkToken().pipe(
      map((data) => data['email']),
      catchError(() => this.getRedirectCommand(url))
    );
  }

  /**
   * Get a token payload.
   * @param token - The token.
   * @returns The token payload.
   */
  private getTokenPayload(token: string) {
    return { token: token };
  }

  /**
   * Get the URL of a related error page.
   * @param route The ActivatedRouteSnapshot.
   * @returns The URL of the related error page.
   */
  private getErrorUrl(route: ActivatedRouteSnapshot) {
    const parent = route.data['parent'] as string;
    return `/${parent}/error`;
  }

  /**
   * Get a redirect command.
   * @param url - The target url.
   * @returns An observable of the type RedirectCommand.
   */
  getRedirectCommand(url: string) {
    const urlTree = this.router.parseUrl(url);
    const command = new RedirectCommand(urlTree);
    return of(command);
  }
}
