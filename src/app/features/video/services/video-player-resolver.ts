import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { VideoStore } from './video-store';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PlayableVideo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class VideoPlayerResolver implements Resolve<PlayableVideo> {
  router: Router = inject(Router);
  vs: VideoStore = inject(VideoStore);

  // clean code ...
  // move + resolve data (loading) ...

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PlayableVideo | RedirectCommand> {
    const token = route.paramMap.get('token') ?? '';
    console.log('token: ', token);
    this.vs.setToken(token);

    const id = Number(route.paramMap.get('id') ?? '0');
    console.log('id: ', id);

    const videoId: number = isNaN(id) ? 0 : id;
    return this.vs.retrieveVideo(videoId).pipe(
      map((data) => new PlayableVideo(data)),
      catchError((err: HttpErrorResponse) => {
        console.log('video player error: ', err);

        if (err.status === 404) {
          return of(
            new RedirectCommand(
              this.router.parseUrl(`/video/${token}/not-found`)
            )
          );
        }
        return of(
          new RedirectCommand(this.router.parseUrl('/authentication-required'))
        );
      })
    );
  }
}
