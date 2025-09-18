import { inject, Injectable } from '@angular/core';

import { UserClient } from '@core/auth/services';
import { Api } from '@shared/services/api';

/**
 * Class representing an video store service.
 * @extends ApiBase
 */
@Injectable({
  providedIn: 'root',
})
export class VideoStore {
  api = inject(Api);
  user = inject(UserClient);

  /**
   * List the videos from the video store.
   * @returns The video list.
   */
  listVideos() {
    return this.api.get('videos');
  }

  /**
   * Retrieve a video from the video store.
   * @param id - The video id.
   * @returns The video.
   */
  retrieveVideo(id: number) {
    return this.api.get('videos', id);
  }
}
