import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { Button } from '@shared/components/buttons';

import { TokenPageConfig } from '../interfaces';

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
  primText = computed(() => this.config().primText);
  primRoute = computed(() => this.config().primRoute);
  secText = computed(() => this.config().secText ?? '');
  secRoute = computed(() => this.config().secRoute ?? '');

  /**
   * Check the configuration for including secondary text and route.
   * @returns True if the configuration includes secondary text and route,
   *          otherwise false.
   */
  hasSecOption() {
    return !!this.secText() && !!this.secRoute();
  }

  /**
   * Navigate to the secondary route on click.
   */
  onSecRoute() {
    if (this.secRoute() !== '') {
      this.router.navigateByUrl(this.secRoute());
    }
  }

  /**
   * Navigate to the primary route on click.
   */
  onPrimRoute() {
    this.router.navigateByUrl(this.primRoute());
  }
}
