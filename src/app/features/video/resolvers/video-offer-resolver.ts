import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { VideoStore } from '@features/video/services';

@Injectable({
  providedIn: 'root',
})
export class VideoOfferResolver {
  private router: Router = inject(Router);
  private vs: VideoStore = inject(VideoStore);

  // clean code ...

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
