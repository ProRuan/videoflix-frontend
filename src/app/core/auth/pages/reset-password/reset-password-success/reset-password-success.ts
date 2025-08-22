import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PrimaryButton } from '@shared/components/buttons';

/**
 * Class representing a reset-password success component.
 */
@Component({
  selector: 'app-reset-password-success',
  imports: [PrimaryButton],
  templateUrl: './reset-password-success.html',
  styleUrl: './reset-password-success.scss',
})
export class ResetPasswordSuccess {
  router: Router = inject(Router);

  /**
   * Redirect to the log-in component on click.
   */
  onLogin() {
    this.router.navigateByUrl('/log-in');
  }
}
