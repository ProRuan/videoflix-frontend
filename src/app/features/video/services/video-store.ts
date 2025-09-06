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
    const token = this.user.get('token');
    return this.api.get('videos', undefined, token);
  }

  /**
   * Retrieve a video from the video store.
   * @param id - The video id.
   * @returns The video.
   */
  retrieveVideo(id: number) {
    const token = this.user.get('token');
    return this.api.get('videos', id, token);
  }
}
