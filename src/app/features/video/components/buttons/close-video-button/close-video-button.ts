import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserClient } from '@core/auth/services';

/**
 * Class representing a video close button.
 */
@Component({
  selector: 'app-close-video-button',
  imports: [],
  templateUrl: './close-video-button.html',
  styleUrl: './close-video-button.scss',
})
export class CloseVideoButton {
  private router = inject(Router);
  private user = inject(UserClient);

  /**
   * Redirect to video offer component.
   */
  onRedirect() {
    const url = this.getUrl();
    this.router.navigateByUrl(url);
  }

  /**
   * Get a video offer URL.
   * @returns The video offer URL.
   */
  private getUrl() {
    return `/video/offer/${this.user.token}`;
  }
}
