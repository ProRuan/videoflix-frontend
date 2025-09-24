import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Class representing a home button component.
 */
@Component({
  selector: 'app-home-button',
  imports: [],
  templateUrl: './home-button.html',
  styleUrl: './home-button.scss',
})
export class HomeButton {
  router = inject(Router);

  /**
   * Check the current route for being the home route.
   * @returns True if the current route is the home route, ohterwise false.
   */
  isHome() {
    return this.router.url === '/';
  }

  /**
   * Redirect to the startsite on click.
   */
  onHome() {
    this.router.navigateByUrl('/');
  }
}
