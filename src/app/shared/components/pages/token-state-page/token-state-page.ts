import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { TokenPageConfigurator } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { TokenPageConfig, TokenStateConfig } from '@shared/interfaces';

type ActionVariants = 'primaryAction' | 'secondaryAction';
type TextVariants = 'primaryText' | 'secondaryText';
type Variants = 'primary' | 'secondary';

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
  configurator = inject(TokenPageConfigurator);

  data = toSignal(this.route.data);
  page = computed(() => this.data()?.['page'] as keyof TokenPageConfigurator);
  state = computed(() => this.data()?.['state'] as keyof TokenPageConfig);
  pageConfig = computed(
    () => this.configurator[this.page()] as TokenPageConfig
  );
  stateConfig = computed(
    () => this.pageConfig()[this.state()] as TokenStateConfig
  );

  /**
   * Get the property value of a token state configuration.
   * @param key - The property key of the token state configuration.
   * @returns The property value of the token state configuration.
   */
  get(key: keyof TokenStateConfig) {
    return this.stateConfig()[key];
  }

  /**
   * Get the messages of a token state configuration.
   * @returns The messages of the token state configuration.
   */
  getMessages() {
    return this.stateConfig().messages;
  }

  /**
   * Check a token state configuration for including secondary properties.
   * @returns True if secondary properties are included, otherwise false.
   */
  hasSecondary() {
    const config = this.stateConfig();
    return config.secondaryText && config.secondaryAction;
  }

  /**
   * Get the button text from a token state configuration.
   * @param variant - The text variant.
   * @returns The button text.
   */
  getText(variant: Variants) {
    const key = `${variant}Text` as TextVariants;
    return this.stateConfig()[key] ?? '';
  }

  /**
   * Perform an action on click based on the token state configuration.
   * @param variant - The action variant.
   */
  onAction(variant: Variants) {
    const key = `${variant}Action` as ActionVariants;
    this.stateConfig()[key]?.();
  }
}
