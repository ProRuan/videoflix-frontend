import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PrimaryButton, SecondaryButton } from '@shared/components/buttons';

/**
 * Class representing a delete-account success component.
 */
@Component({
  selector: 'app-delete-account-success',
  imports: [PrimaryButton, SecondaryButton],
  templateUrl: './delete-account-success.html',
  styleUrl: './delete-account-success.scss',
})
export class DeleteAccountSuccess {
  router: Router = inject(Router);

  /**
   * Redirect to the startsite component on click.
   */
  onHome() {
    this.router.navigateByUrl('/');
  }

  /**
   * Redirect to the sign-up component on click.
   */
  onSignUp() {
    this.router.navigateByUrl('/sign-up');
  }
}
