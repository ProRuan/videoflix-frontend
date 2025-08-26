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
import { catchError, Observable, of } from 'rxjs';
import { VideoStore } from '@features/video/services';

@Injectable({
  providedIn: 'root',
})
export class AuthResolver implements Resolve<void> {
  private router: Router = inject(Router);
  private auth: Authenticator = inject(Authenticator);
  private vs: VideoStore = inject(VideoStore);

  // no token check necessary since video list request ... ?
  // update alt url ... !

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<void | RedirectCommand> {
    const token = route.paramMap.get('token') ?? '';
    this.vs.setToken(token);
    return this.vs
      .listVideos()
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
