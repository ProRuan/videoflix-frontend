import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { PlayableVideoData } from '../interfaces';
import { VideoStore } from './video-store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoPlayerResolver implements Resolve<PlayableVideoData> {
  vs: VideoStore = inject(VideoStore);

  // improve concept of video player resolver ...

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<PlayableVideoData>
    | Promise<PlayableVideoData>
    | PlayableVideoData {
    const id = Number(route.paramMap.get('id'));
    const videoId: number = isNaN(id) ? 0 : id;
    return this.vs.retrieveVideo(videoId);
  }
}
