import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PrimaryButton } from '@shared/components/buttons';

/**
 * Class representing a page-not-found component.
 */
@Component({
  selector: 'app-page-not-found',
  imports: [PrimaryButton],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',
})
export class PageNotFound {
  router: Router = inject(Router);

  /**
   * Redirect to the startsite on click.
   */
  onHome() {
    this.router.navigateByUrl('/');
  }
}
