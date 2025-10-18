import { ElementRef, Injectable, signal } from '@angular/core';

import { VideoGroup } from '../interfaces';
import { Video } from '../models';

/**
 * Class representing a video offer facade service.
 *
 * Provides a video offer´s properties and methods.
 */
@Injectable({
  providedIn: 'root',
})
export class VideoOfferFacade {
  library = signal<VideoGroup[]>([]);
  video = signal<Video | null>(null);
  preview = signal<ElementRef<HTMLVideoElement> | undefined>(undefined);

  hasPreview = signal(false);

  /**
   * Update the video preview.
   * @param video - The video to be set.
   */
  updateVideoPreview(video: Video) {
    this.video.set(video);
    this.preview()?.nativeElement.load();
  }
}
