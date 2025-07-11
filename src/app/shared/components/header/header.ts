import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Videoflix } from '../../services/videoflix';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

/**
 * Class representing a header component.
 */
export class Header {
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);

  @Input() notLogIn: boolean = true;

  /**
   * Check a router url for the base href.
   * @returns A boolean value.
   */
  public isStartsite() {
    return this.videoflix.isStartsite();
  }

  /**
   * Navigate to the startsite component.
   */
  public onHome() {
    this.router.navigateByUrl('');
  }

  /**
   * Navigate to the log-in component.
   */
  public onNavigate() {
    this.router.navigateByUrl('log-in');
  }
}
