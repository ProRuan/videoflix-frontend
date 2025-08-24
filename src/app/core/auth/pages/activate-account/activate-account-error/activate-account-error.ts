import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PrimaryButton } from '@shared/components/buttons';

/**
 * Class representing an activate-account error component.
 */
@Component({
  selector: 'app-activate-account-error',
  imports: [PrimaryButton],
  templateUrl: './activate-account-error.html',
  styleUrl: './activate-account-error.scss',
})
export class ActivateAccountError {
  router: Router = inject(Router);

  /**
   * Resend an activate-account link on click.
   */
  onEmailResend() {
    this.router.navigateByUrl('/reactivate-account');
  }

  /**
   * Redirect to the log-in component on click.
   */
  onLogin() {
    this.router.navigateByUrl('/log-in');
  }
}
