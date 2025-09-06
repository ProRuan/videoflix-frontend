import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  Router,
} from '@angular/router';

import { catchError, Observable, of } from 'rxjs';

import { tokenPatterns } from '@shared/modules/form-validation';

import { TokenCheckResponse } from '../interfaces';
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

  private readonly pattern = tokenPatterns.token;

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
   * Resolve a token parameter to get a token check response.
   * @param route - The ActivatedRouteSnapshot.
   * @returns The token check response or a redirect command.
   */
  resolveToken(
    route: ActivatedRouteSnapshot
  ): Observable<TokenCheckResponse | RedirectCommand> {
    const token = this.getRouteParam(route, 'token');
    const payload = this.getTokenPayload(token);
    const url = this.getErrorUrl(route);
    return this.auth
      .checkToken(payload)
      .pipe(catchError(() => this.getRedirectCommand(url)));
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
