import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PageNavigator } from '@shared/services';

/**
 * Class representing a back button component.
 */
@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {
  router = inject(Router);
  navigator = inject(PageNavigator);

  /**
   * Redirect to the previous page on click.
   */
  onBack() {
    const url = this.navigator.previousUrl;
    this.router.navigateByUrl(url);
  }
}
