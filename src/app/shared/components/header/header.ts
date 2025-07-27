import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PrimaryButton } from '../primary-button/primary-button';
import { Videoflix } from '../../services/videoflix';

@Component({
  selector: 'app-header',
  imports: [CommonModule, PrimaryButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

/**
 * Class representing a header component.
 */
export class Header {
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);

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
    this.router.navigateByUrl('log-in');
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

  /**
   * Navigate to the log-in component.
   */
  onNavigate() {
    this.router.navigateByUrl('log-in');
  }
}
