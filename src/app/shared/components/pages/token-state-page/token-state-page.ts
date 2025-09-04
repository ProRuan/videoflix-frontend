import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { TOKEN_PAGE_CONFIG } from '@core/auth/constants';
import { TokenPageConfig, TokenStatePageConfig } from '@core/auth/interfaces';
import { Button } from '@shared/components/buttons';

/**
 * Class representing a token state page component.
 */
@Component({
  selector: 'app-token-state-page',
  imports: [Button],
  templateUrl: './token-state-page.html',
  styleUrl: './token-state-page.scss',
})
export class TokenStatePage {
  route = inject(ActivatedRoute);
  router = inject(Router);

  data = toSignal(this.route.data);
  page = computed(() => this.data()?.['page'] as keyof TokenStatePageConfig);
  state = computed(() => this.data()?.['state'] as keyof TokenPageConfig);
  config = computed(() => TOKEN_PAGE_CONFIG[this.page()][this.state()]);

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
  hasSecondaryOptions() {
    return !!this.secText() && !!this.secRoute();
  }

  /**
   * Navigate to the secondary route on click.
   */
  onSecondaryRoute() {
    if (this.secRoute() !== '') {
      this.router.navigateByUrl(this.secRoute());
    }
  }

  /**
   * Navigate to the primary route on click.
   */
  onPrimaryRoute() {
    this.router.navigateByUrl(this.primRoute());
  }
}
