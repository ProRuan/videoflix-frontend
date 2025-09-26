import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

import { filter, map, startWith } from 'rxjs';

import { AuthResponse } from '@core/auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class Videoflix {
  private router: Router = inject(Router);

  // if still token: login redirects to video-offer ... ?

  // our support: replace with configurated support email ...

  // sign-out
  // --------
  // think about header buttons ...
  // think about button options of sign-out success dialog ...

  // activate-account
  // ----------------
  // backend: remove used:True on token-check ...
  // add button type="button" (for reset-password and activate-account) ...
  // add button disabled (even form should not be invalid) ...
  // apply secondary button style for button pairs ...

  // reset-password
  // --------------
  // review guards and resolvers ...
  //   --> injection in constructor ... ?!
  // add loading indicator for guards and resolvers ...

  cachedEmail: string = '';

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

  // fix this ...
  isVideoOffer() {
    return /\/video\/offer\/[0-9a-f]{40}/.test(this.currentUrl());
    // return this.currentUrl() === '/video-offer';
  }
}
