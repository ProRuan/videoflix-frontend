import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PrimaryButton } from '@shared/components/buttons';

/**
 * Class representing a delete-account error component.
 */
@Component({
  selector: 'app-delete-account-error',
  imports: [PrimaryButton],
  templateUrl: './delete-account-error.html',
  styleUrl: './delete-account-error.scss',
})
export class DeleteAccountError {
  router: Router = inject(Router);

  /**
   * Redirect to the log-in component on click.
   */
  onLogin() {
    this.router.navigateByUrl('/log-in');
  }
}
