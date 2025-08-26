import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PrimaryButton, SecondaryButton } from '@shared/components/buttons';

/**
 * Class representing an authentication-required component.
 */
@Component({
  selector: 'app-authentication-required',
  imports: [PrimaryButton, SecondaryButton],
  templateUrl: './authentication-required.html',
  styleUrl: './authentication-required.scss',
})
export class AuthenticationRequired {
  router: Router = inject(Router);

  /**
   * Redirect to the login on click.
   */
  onLogin() {
    this.router.navigateByUrl('/log-in');
  }

  /**
   * Redirect to the startsite on click.
   */
  onHome() {
    this.router.navigateByUrl('/');
  }
}
