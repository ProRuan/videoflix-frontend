import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Authenticator } from '../services';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailResolver implements Resolve<string> {
  router: Router = inject(Router);
  auth: Authenticator = inject(Authenticator);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<string | RedirectCommand> {
    const token = route.paramMap.get('token') ?? '';
    const payload = { token: token };
    return this.auth
      .requestUserEmail(payload)
      .pipe(
        catchError(() =>
          of(
            new RedirectCommand(
              this.router.parseUrl('/authentication-required')
            )
          )
        )
      );
  }
}
