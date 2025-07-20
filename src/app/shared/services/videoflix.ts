import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthResponse } from '../interfaces/auth-response';
import { User } from '../models/user';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Videoflix {
  private router: Router = inject(Router);

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
}
