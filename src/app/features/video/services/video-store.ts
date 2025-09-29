import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserClient } from '@core/auth/services';
import { BaseStore } from '@shared/services';

import { PlayableVideoData, VideoGroupData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class VideoStore {
  store = inject(BaseStore);
  user = inject(UserClient);

  // fix GET "/api/videos/{id}/" ...
  // return { ... } and not video: { ... } ...

  // write class comment ...
  // review comments ...
  // compare with other services ...

  /**
   * List the videos from the video store.
   * @returns An Observable with the video group data array.
   */
  listVideos(): Observable<VideoGroupData[]> {
    return this.store.get(['videos']);
  }

  /**
   * Retrieve a video from the video store.
   * @param id - The video id.
   * @returns An Observable with the playable video data.
   */
  retrieveVideo(id: number): Observable<{ video: PlayableVideoData }> {
    return this.store.get(['videos', id.toString()]);
  }
}
