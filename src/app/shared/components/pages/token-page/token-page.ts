import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { Button } from '@shared/components/buttons';
import { TokenPageConfig } from '@shared/interfaces';

/**
 * Class representing a token page component.
 */
@Component({
  selector: 'app-token-page',
  imports: [Button],
  templateUrl: './token-page.html',
  styleUrl: './token-page.scss',
})
export class TokenPage {
  route = inject(ActivatedRoute);
  router = inject(Router);

  data = toSignal(this.route.data);
  config = computed(() => this.data()?.['config'] as TokenPageConfig);

  color = computed(() => this.config().color);
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
    this.router.navigateByUrl(this.primUrl());
  }
}
