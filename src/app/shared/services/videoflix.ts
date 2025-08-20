import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

import { filter, map, startWith } from 'rxjs';

import { AuthResponse } from '@core/auth/interfaces';
import { User } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class Videoflix {
  private router: Router = inject(Router);

  // reset-password
  // --------------
  // checkToken() with simple string payload ...
  // use only canActivate guards and resolveFn resolvers ...
  //   --> if inject then class (not fn) ...
  // add loading indicator for guards and resolvers ...
  // review resolveToken() on TokenStore service ...

  cachedEmail: string = '';
  user: User = new User();

  readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((evt) => evt instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  isHome() {
    return this.currentUrl() === '/';
  }

  setAuthData(response: AuthResponse) {
    this.user.setAuthData(response);
  }

  isVideoOffer() {
    return this.currentUrl() === '/video-offer';
  }

  logOut() {
    this.user.reset();
  }
}
