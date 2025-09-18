import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Button } from '@shared/components/buttons';

import { Videoflix } from '../../../../shared/services/videoflix';
import { VideoStore } from '@features/video/services';
import { AuthStore, UserClient } from '@core/auth/services';

/**
 * Class representing a header component.
 */
@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);
  private auth: AuthStore = inject(AuthStore);
  private user: UserClient = inject(UserClient);
  private vs: VideoStore = inject(VideoStore);

  // think about header.html ...
  // finalize header ...
  // add more header types ... ?

  @Input() complete: boolean = true;

  /**
   * Check the current component for being the video offer component.
   * @returns A boolean value.
   */
  isVideoOffer() {
    return this.videoflix.isVideoOffer();
  }

  /**
   * Log out a user and navigate to the log-in component.
   */
  onLogOut() {
    this.videoflix.logOut();
    const token = this.user.get('token');
    this.auth.logOut(token).subscribe({
      next: (value) => this.router.navigateByUrl('/log-in'),
    });
    // this.router.navigateByUrl('log-in');
  }

  /**
   * Check the current component for being the startsite component.
   * @returns A boolean value.
   */
  isHome() {
    return this.videoflix.isHome();
  }

  /**
   * Navigate to the startsite component.
   */
  onHome() {
    this.router.navigateByUrl('');
  }

  onSignOut() {
    const url = `/sign-out/${this.user.get('token')}`;
    this.router.navigateByUrl(url);
  }

  onNavigate(url: string) {
    this.router.navigateByUrl(url);
  }

  // /**
  //  * Navigate to the log-in component.
  //  */
  // onNavigate() {
  //   this.router.navigateByUrl('log-in');
  // }
}
