import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStore } from '@core/auth/services';

import { Button } from '@shared/components/buttons';
import { DialogIds } from '@shared/constants';
import { DialogManager } from '@shared/services';

/**
 * Class representing a success dialog component.
 */
@Component({
  selector: 'app-success-dialog',
  imports: [Button],
  templateUrl: './success-dialog.html',
  styleUrl: './success-dialog.scss',
})
export class SuccessDialog {
  private router = inject(Router);
  private auth = inject(AuthStore);
  private dialogs = inject(DialogManager);

  title = computed(() => this.dialogs.title());
  messages = computed(() => this.dialogs.messages());
  label = computed(() => this.dialogs.label());
  url = computed(() => this.dialogs.url());

  /**
   * Get the closing state of a success dialog.
   * @returns True if the dialog is closing, otherwise false.
   */
  get closing() {
    return this.dialogs.isClosing(DialogIds.Success);
  }

  /**
   * Start closing a success dialog on click.
   */
  onCloseStart() {
    this.dialogs.startClosing();
  }

  /**
   * Remove a success dialog from the HTML DOM on transtion end.
   */
  onCloseEnd() {
    if (this.closing) {
      this.dialogs.close();
    }
  }

  /**
   * Stop an event.
   * @param event - The event to be stopped.
   */
  onEventStop(event: Event) {
    event.stopPropagation();
  }

  /**
   * Redirect user to target route on click.
   */
  onRedirect() {
    this.dialogs.close();
    this.redirect();
  }

  /**
   * Redirect user to target route.
   */
  redirect() {
    const url = this.getUrl();
    this.router.navigateByUrl(url);
  }

  /**
   * Get a target URL.
   * @returns The target URL.
   */
  getUrl() {
    const url = `/${this.url()}`;
    if (this.isVideoOffer()) {
      const token = this.auth.getToken();
      return url + '/' + token;
    } else {
      return url;
    }
  }

  /**
   * Check if a URL matches the video offer URL.
   * @returns True if the URL matches the video offer URL, otherwise false.
   */
  isVideoOffer() {
    return this.url() === 'video/offer';
  }
}
