import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { UserClient } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { ErrorPageConfig } from '@shared/interfaces';

/**
 * Class representing an error page component.
 */
@Component({
  selector: 'app-error-page',
  imports: [Button],
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss',
})
export class ErrorPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private user = inject(UserClient);

  private data = toSignal(this.route.data);
  private config = computed(() => this.data()?.['config'] as ErrorPageConfig);

  status = computed(() => this.config().status);
  title = computed(() => this.config().title);
  messages = computed(() => this.config().messages);
  primLabel = computed(() => this.config().primLabel);
  primUrl = computed(() => this.config().primUrl);
  secLabel = computed(() => this.config().secLabel ?? '');
  secUrl = computed(() => this.config().secUrl ?? '');

  /**
   * Check the configuration for including secondary label and URL.
   * @returns True if the configuration includes secondary label and URL,
   *          otherwise false.
   */
  hasSecOption() {
    return !!this.secLabel() && !!this.secUrl();
  }

  /**
   * Navigate to the secondary route on click.
   */
  onSecRoute() {
    if (this.secUrl() !== '') {
      this.router.navigateByUrl(this.secUrl());
    }
  }

  /**
   * Navigate to the primary route on click.
   */
  onPrimRoute() {
    const url = this.getPrimUrl();
    this.router.navigateByUrl(url);
  }

  /**
   * Get a primary URL.
   * @returns The primary URL.
   */
  private getPrimUrl() {
    if (this.isTokenUrl()) {
      return this.primUrl().replace(':token', this.user.token);
    } else {
      return this.primUrl();
    }
  }

  /**
   * Check if the primary URL includes a token parameter.
   * @returns True if the primary URL includes a token parameter,
   *          otherwise false.
   */
  private isTokenUrl() {
    return this.primUrl().includes(':token');
  }
}
