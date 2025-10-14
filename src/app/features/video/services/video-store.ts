import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseStore } from '@shared/services';

import { PlayableVideoData, VideoGroupData } from '../interfaces';

/**
 * Class representing a video store service.
 *
 * Provides methods for Videoflix API video requests.
 */
@Injectable({
  providedIn: 'root',
})
export class VideoStore {
  store = inject(BaseStore);

  /**
   * List the videos from the Videoflix API.
   * @returns An Observable with the video group data array.
   */
  listVideos(): Observable<VideoGroupData[]> {
    return this.store.get(['videos']);
  }

  /**
   * Retrieve a video from the the Videoflix API.
   * @param id - The video id.
   * @returns An Observable with the playable video data.
   */
  retrieveVideo(id: number): Observable<PlayableVideoData> {
    return this.store.get(['videos', id.toString()]);
  }
}
