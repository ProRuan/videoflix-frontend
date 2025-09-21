import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthFormBase } from '@core/auth/directives';
import {
  RegistrationForm,
  RegistrationPayload,
  RegistrationResponse,
} from '@core/auth/interfaces';
import { AuthStore, AuthUtils } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { EmailInput, PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { ToastManager } from '@shared/services';

/**
 * Class representing a reset-password component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-reset-password',
  imports: [Button, EmailInput, LoadingBar, PasswordInput, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword extends AuthFormBase<
  RegistrationForm,
  RegistrationPayload,
  RegistrationResponse
> {
  route = inject(ActivatedRoute);
  router = inject(Router);
  auth = inject(AuthStore);
  utils = inject(AuthUtils);
  toasts = inject(ToastManager);

  data = toSignal(this.route.data);
  requestEmail = computed(() => this.data()?.['email'] as string);

  /**
   * Get a password update form.
   * @returns The password update form.
   */
  getForm(): FormGroup<RegistrationForm> {
    return this.utils.getRegistrationForm();
  }

  /**
   * Update the email control with the user´s email.
   */
  override initOptions(): void {
    this.email.setValue(this.requestEmail());
  }

  /**
   * Get the payload for a password update.
   * @returns The payload for the password update.
   */
  getPayload(): RegistrationPayload {
    return this.utils.getRegistrationPayload(this.form);
  }

  /**
   * Request a password update from the Videoflix API.
   * @param payload - The payload for the password update.
   * @returns An Observable with the registration response.
   */
  request$(payload: RegistrationPayload): Observable<RegistrationResponse> {
    return this.auth.updatePassword(payload);
  }

  /**
   * Complete password update and redirect user to success page.
   */
  onSuccess(): void {
    this.toasts.close();
    this.router.navigate(['..', 'success'], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  /**
   * Handle error response and further actions.
   * @param error - The error response.
   */
  onError(error: HttpErrorResponse): void {
    console.log('error: ', error);
  }
}
