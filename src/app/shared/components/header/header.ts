import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PrimaryButton } from '../primary-button/primary-button';
import { Videoflix } from '../../services/videoflix';

@Component({
  selector: 'app-header',
  imports: [PrimaryButton],
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
   * Check a router url for the base href.
   * @returns A boolean value.
   */
  isStartsite() {
    return this.videoflix.isStartsite();
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
