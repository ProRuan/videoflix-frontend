import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserClient } from '@core/auth/services';

import { VideoPlayerFacade } from '@features/video/services';

@Component({
  selector: 'app-close-video-button',
  imports: [],
  templateUrl: './close-video-button.html',
  styleUrl: './close-video-button.scss',
})
export class CloseVideoButton {
  private router = inject(Router);
  private user = inject(UserClient);

  onClose() {
    const url = `/video/offer/${this.user.token}`;
    this.router.navigateByUrl(url);
  }
}
