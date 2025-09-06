import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserClient } from '@core/auth/services';
import { Button } from '@shared/components/buttons';

/**
 * Class representing a video header component.
 */
@Component({
  selector: 'app-video-header',
  imports: [Button],
  templateUrl: './video-header.html',
  styleUrl: './video-header.scss',
})
export class VideoHeader {
  router = inject(Router);
  user = inject(UserClient);

  /**
   * Redirect to the sign-out page on click.
   */
  onSignOut() {
    this.user.signOut();
  }

  /**
   * Log out and redirect to the log-in page on click.
   */
  onLogOut() {
    this.user.logOut();
  }
}
