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
  messages: WritableSignal<string[]> = signal([]);
  label: WritableSignal<string> = signal('');
  url: WritableSignal<string> = signal('');

  default: ToastConfig = AUTH_TOAST_CONFIG.default;

  /**
   * Set a toast configuration.
   * @param error - The error response.
   * @param config - The toast configuration to be set.
   */
  setConfig(error: HttpErrorResponse, config?: ToastConfig) {
    if (this.isConfig(error, config)) {
      this.setConfigValues(config);
    } else {
      this.setConfigValues(this.default);
    }
  }

  /**
   * Check for a match between error status and configuration status.
   * @param error - The error response.
   * @param config - The toast configuration.
   * @returns True if the error status matches the configuration status,
   *          otherwise false.
   */
  isConfig(error: HttpErrorResponse, config?: ToastConfig) {
    return config && error.status === config.status;
  }

  /**
   * Set the values of a toast configuration.
   * @param config - The toast configuration to be set.
   */
  setConfigValues(config?: ToastConfig) {
    this.messages.set(config?.messages ?? []);
    this.label.set(config?.label ?? '');
    this.url.set(config?.url ?? '');
  }

  /**
   * Show an error toast.
   * @param error - The error response.
   * @param config - The toast configuration to be set.
   */
  showError(error: HttpErrorResponse, config?: ToastConfig) {
    this.setConfig(error, config);
    this.open(ToastIds.Error);
  }
}
