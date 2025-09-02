import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Button } from '@shared/components/buttons';

/**
 * Class representing an authentication-required component.
 */
@Component({
  selector: 'app-authentication-required',
  imports: [Button],
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
