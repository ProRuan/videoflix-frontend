import { Injectable } from '@angular/core';
import { ApiBase } from '@shared/services/api-base';

@Injectable({
  providedIn: 'root',
})
export class VideoStore extends ApiBase {
  listVideos() {
    return this.get('videos');
  }

  getVideo(id: number) {
    return this.get('videos', id);
  }
}
