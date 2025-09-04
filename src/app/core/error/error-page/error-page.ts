import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { Button } from '@shared/components/buttons';
import { ERROR_PAGE_CONFIG } from '@shared/constants';
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
  route = inject(ActivatedRoute);
  router = inject(Router);

  data = toSignal(this.route.data);
  key = computed(() => this.data()?.['configKey'] as keyof ErrorPageConfig);
  config = computed(() => ERROR_PAGE_CONFIG[this.key()]);

  status = computed(() => this.config().status);
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
   * Navigate to the prim route on click.
   */
  onPrimaryAction() {
    this.router.navigateByUrl(this.primRoute());
  }

  /**
   * Navigate to the secondary route on click.
   */
  onSecondaryAction() {
    if (this.secRoute() !== '') {
      this.router.navigateByUrl(this.secRoute());
    }
  }
}
