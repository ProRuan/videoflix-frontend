import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Button, HomeButton } from '@shared/components/buttons';

/**
 * Class representing a core header component.
 */
@Component({
  selector: 'app-core-header',
  imports: [Button, HomeButton],
  templateUrl: './core-header.html',
  styleUrl: './core-header.scss',
})
export class CoreHeader {
  router = inject(Router);

  /**
   * Check the route for being the log-in route.
   * @returns True if the current route is the log-in route, otherwise false.
   */
  isNotLogIn() {
    return this.router.url !== '/log-in';
  }

  /**
   * Redirect to the log-in.
   */
  onLogIn() {
    this.router.navigateByUrl('/log-in');
  }
}
