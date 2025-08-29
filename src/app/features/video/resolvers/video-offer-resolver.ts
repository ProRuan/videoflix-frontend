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
  ): Observable<VideoGroup[] | RedirectCommand> {
    const token = route.paramMap.get('token') ?? '';
    this.vs.setToken(token);
    return this.vs.listVideos().pipe(
      map((res: VideoGroupData[]) => {
        const newRes = res.map((g) => {
          return { genre: g.genre, videos: g.videos.map((v) => new Video(v)) };
        });
        console.log('new res: ', newRes);
        return newRes;
      }),
      catchError(() =>
        of(
          new RedirectCommand(this.router.parseUrl('/authentication-required'))
        )
      )
    );
  }
}
