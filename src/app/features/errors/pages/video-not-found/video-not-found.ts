import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VideoStore } from '@features/video/services';
import { Button } from '@shared/components/buttons';

/**
 * Class representing a video-not-found component.
 */
@Component({
  selector: 'app-video-not-found',
  imports: [Button],
  templateUrl: './video-not-found.html',
  styleUrl: './video-not-found.scss',
})
export class VideoNotFound {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  vs: VideoStore = inject(VideoStore);

  /**
   * Redirect to the video offer on click.
   */
  onVideoOffer() {
    const token = this.vs.getToken();
    this.router.navigateByUrl(`/video/offer/${token}`);
  }
}
