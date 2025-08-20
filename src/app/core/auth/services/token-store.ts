import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  Router,
} from '@angular/router';

import { catchError, Observable, of } from 'rxjs';

import { tokenErrorData } from '@core/errors/constants';

import { TokenCheckResponse } from '../interfaces';
import { Authenticator } from './authenticator';

/**
 * Class representing a token store service.
 */
@Injectable({
  providedIn: 'root',
})
export class TokenStore {
  private router: Router = inject(Router);
  private auth: Authenticator = inject(Authenticator);

  private readonly pattern = /^[0-9a-f]{40}$/i;

  /**
   * Perform a token check.
   * @param route - The ActivatedRouteSnapshot.
   * @param segments - The URL segments.
   * @returns True or a URL tree.
   */
  hasToken(route: ActivatedRouteSnapshot, segments: string[]) {
    const token = this.getRouteParam(route, 'token');
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
   * Perform a token error check.
   * @param route - The ActivatedRouteSnapshot.
   * @param segments - The URL segments.
   * @returns True or a URL tree.
   */
  hasTokenError(route: ActivatedRouteSnapshot) {
    const error = this.getRouteParam(route, 'error');
    if (this.isTokenError(error)) return true;
    return this.router.createUrlTree(['/page-not-found']);
  }

  /**
   * Check a token error by error key.
   * @param token - The token error to be tested.
   * @returns A boolean value.
   */
  private isTokenError(error: string) {
    return Object.keys(tokenErrorData).includes(error);
  }

  /**
   * Resolve a token parameter to get a token check response.
   * @param route - The ActivatedRouteSnapshot.
   * @returns The token check response or a redirect command.
   */
  resolveToken(
    route: ActivatedRouteSnapshot
  ): Observable<TokenCheckResponse | RedirectCommand> {
    const token = this.getRouteParam(route, 'token');
    const payload = { token: token };
    return this.auth.checkToken(payload).pipe(
      catchError(() => {
        const urlTree = this.router.parseUrl('/token/rejected');
        const command = new RedirectCommand(urlTree);
        return of(command);
      })
    );
  }

  /**
   * Resolve an error parameter to get an error key.
   * @param route - The ActivatedRouteSnapshot.
   * @returns The error key as string.
   */
  resolveTokenError(route: ActivatedRouteSnapshot): string {
    return this.getRouteParam(route, 'error', 'required');
  }
}
