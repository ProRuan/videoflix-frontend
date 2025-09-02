import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Button } from '@shared/components/buttons';

/**
 * Class representing a reset-password error component.
 */
@Component({
  selector: 'app-reset-password-error',
  imports: [Button],
  templateUrl: './reset-password-error.html',
  styleUrl: './reset-password-error.scss',
})
export class ResetPasswordError {
  router: Router = inject(Router);

  /**
   * Redirect to the forgot-password component on click.
   */
  onTokenRequest() {
    this.router.navigateByUrl('/forgot-password');
  }

  /**
   * Redirect to the log-in component on click.
   */
  onLogin() {
    this.router.navigateByUrl('/log-in');
  }
}
