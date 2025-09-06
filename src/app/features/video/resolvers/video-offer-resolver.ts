import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { VideoStore } from '@features/video/services';
import { VideoGroup, VideoGroupData } from '../interfaces';
import { Video } from '../models';
import { UserClient } from '@core/auth/services';

@Injectable({
  providedIn: 'root',
})
export class VideoOfferResolver {
  private router = inject(Router);
  private user = inject(UserClient);
  private vs = inject(VideoStore);

  // clean code ...

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<VideoGroup[] | RedirectCommand> {
    const token = route.paramMap.get('token') ?? '';
    this.user.logIn({ token: token, email: '', user_id: 0 });
    return this.vs.listVideos().pipe(
      map((res: VideoGroupData[]) => {
        const newRes = res.map((g) => {
          return { genre: g.genre, videos: g.videos.map((v) => new Video(v)) };
        });
        console.log('new res: ', newRes);
        return newRes;
      }),
      catchError(() =>
        of(new RedirectCommand(this.router.parseUrl('/unauthorized')))
      )
    );
  }
}
