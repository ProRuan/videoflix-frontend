import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore, UserClient } from '@core/auth/services';

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
  auth = inject(AuthStore);
  user: UserClient = inject(UserClient);
  vs: VideoStore = inject(VideoStore);

  /**
   * Redirect to the video offer on click.
   */
  onVideoOffer() {
    const token = this.auth.getToken();
    this.router.navigateByUrl(`/video/offer/${token}`);
  }
}
