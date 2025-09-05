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
   * Redirect to the startsite on click.
   */
  onHome() {
    this.router.navigateByUrl('/');
  }
}
