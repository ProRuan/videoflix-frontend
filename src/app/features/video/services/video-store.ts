import { Injectable } from '@angular/core';

import { ApiBase } from '@shared/services';

/**
 * Class representing an video store service.
 * @extends ApiBase
 */
@Injectable({
  providedIn: 'root',
})
export class VideoStore extends ApiBase {
  /**
   * List the videos from the video store.
   * @returns The video list.
   */
  listVideos() {
    return this.get('videos');
  }

  /**
   * Retrieve a video from the video store.
   * @param id - The video id.
   * @returns The video.
   */
  retrieveVideo(id: number) {
    return this.get('videos', id);
  }
}
