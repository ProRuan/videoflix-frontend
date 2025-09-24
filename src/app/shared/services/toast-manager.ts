import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';

import { AUTH_TOAST_CONFIG } from '@core/auth/constants';
import { ToastIds } from '@shared/constants';
import { ToastConfig } from '@shared/interfaces';

import { OverlayManagerBase } from './overlay-manager-base';

/**
 * Class representing a toast manager service.
 * @extends OverlayManagerBase
 */
@Injectable({
  providedIn: 'root',
})
export class ToastManager extends OverlayManagerBase {
  messages: string[] = [];
  label: string = '';
  route: string = '';

  default: ToastConfig = AUTH_TOAST_CONFIG.default;

  message: string = 'Please check your input and try again.';
  private timeoutId!: ReturnType<typeof setTimeout>;

  // improve an rename ... !
  errorMessage: WritableSignal<string> = signal('');

  // replace any ...
  // set default config ...
  setErrorConfig(error: HttpErrorResponse, config?: ToastConfig) {
    if (config && error.status === config.status) {
      this.messages = config.messages;
      this.label = config.button?.label ?? '';
      this.route = config.button?.route ?? '';
    } else {
      this.messages = this.default.messages;
      this.label = this.default.button?.label ?? '';
      this.route = this.default.button?.route ?? '';
    }
  }

  setErrorToast(error: HttpErrorResponse, config?: ToastConfig) {
    if (config && error.status === config.status) {
      this.messages = config.messages;
      this.label = config.button?.label ?? '';
      this.route = config.button?.route ?? '';
    } else {
      this.messages = this.default.messages;
      this.label = this.default.button?.label ?? '';
      this.route = this.default.button?.route ?? '';
    }
  }

  // improve an rename ... !
  openError(error: HttpErrorResponse) {
    this.open(ToastIds.Error);
    console.log('error: ', error);
    console.log('error - status: ', error.status);
    // console.log('error - status text: ', error.statusText);
    console.log('error - custom: ', error.error.detail[0]);
    this.errorMessage.set(error.error.detail[0]);
  }

  // replace any with interface ...
  showError(error: HttpErrorResponse, config?: ToastConfig) {
    this.setErrorToast(error, config);
    this.openErrorToast();
  }

  /**
   * Open an error toast.
   */
  openErrorToast() {
    // this.clearTimeout();
    this.open(ToastIds.Error);
    // this.timeoutId = setTimeout(() => {
    //   this.hasCloseStyle.set(true);
    // }, 4000);
  }

  /**
   * Slide out a toast element without timeout.
   */
  slideOutImmediately() {
    this.clearTimeout();
    this.startClosing();
  }

  /**
   * Clear the current timeout.
   */
  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
