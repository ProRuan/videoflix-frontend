import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenPageConfig } from '@shared/interfaces';

/**
 * Class representing a token page configurator service.
 */
@Injectable({
  providedIn: 'root',
})
export class TokenPageConfigurator {
  private router = inject(Router);

  readonly activateAccount: TokenPageConfig = {
    error: {
      title: 'Token rejected',
      color: 'c-error',
      messages: [
        'This activation link can no longer be used.',
        'Request a new activation email or go to login.',
      ],
      primaryText: 'Request email',
      secondaryText: 'Go to login',
      primaryAction: () => this.navigate('reactivate-account'),
      secondaryAction: () => this.navigate('log-in'),
    },
    success: {
      title: 'Account activated',
      color: 'c-success',
      messages: [
        'Your email has been confirmed.',
        'You can now log in with your account.',
      ],
      primaryText: 'Go to login',
      primaryAction: () => this.navigate('log-in'),
    },
  };

  readonly resetPassword: TokenPageConfig = {
    error: {
      title: 'Token rejected',
      color: 'c-error',
      messages: [
        'This reset link can no longer be used.',
        'Request a new reset email or go to login.',
      ],
      primaryText: 'Request email',
      secondaryText: 'Go to login',
      primaryAction: () => this.navigate('forgot-password'),
      secondaryAction: () => this.navigate('log-in'),
    },
    success: {
      title: 'Password successfully reset',
      color: 'c-success',
      messages: [
        'Your password has been reset.',
        'You can now log in with your new password.',
      ],
      primaryText: 'Go to login',
      primaryAction: () => this.navigate('log-in'),
    },
  };

  readonly deleteAccount: TokenPageConfig = {
    error: {
      title: 'Token rejected',
      color: 'c-error',
      messages: [
        'This deletion link can no longer be used.',
        'Log in and request a new deletion email.',
      ],
      primaryText: 'Go to login',
      primaryAction: () => this.navigate('log-in'),
    },
    success: {
      title: 'Account deleted',
      color: 'c-success',
      messages: [
        'Your account has been deleted.',
        'You can now go home or create a new account.',
      ],
      primaryText: 'Go to home',
      secondaryText: 'Go to sign-up',
      primaryAction: () => this.navigate(''),
      secondaryAction: () => this.navigate('sign-up'),
    },
  };

  /**
   * Navigate to a target URL.
   * @param url - The target URL.
   * @returns A promise of the type boolean.
   */
  private navigate(url: string) {
    return this.router.navigateByUrl(`/${url}`);
  }
}
