import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Button } from '@shared/components/buttons';

/**
 * Class representing an activate-account success component.
 */
@Component({
  selector: 'app-activate-account-success',
  imports: [Button],
  templateUrl: './activate-account-success.html',
  styleUrl: './activate-account-success.scss',
})
export class ActivateAccountSuccess {
  router: Router = inject(Router);

  /**
   * Redirect to the log-in component on click.
   */
  onLogin() {
    this.router.navigateByUrl('/log-in');
  }
}
