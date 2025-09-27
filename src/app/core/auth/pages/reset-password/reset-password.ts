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
  UserResponse,
} from '@core/auth/interfaces';
import { AuthFormUtils, AuthStore } from '@core/auth/services';
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
  UserResponse
> {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthStore);
  private utils = inject(AuthFormUtils);
  private toasts = inject(ToastManager);

  private data = toSignal(this.route.data);
  private requestEmail = computed(() => this.data()?.['email'] as string);

  /**
   * Get a password update form.
   * @returns The password update form.
   */
  protected getForm(): FormGroup<RegistrationForm> {
    return this.utils.getRegistrationForm();
  }

  /**
   * Update the email control with the user´s email.
   */
  protected override initOptions(): void {
    this.email.setValue(this.requestEmail());
  }

  /**
   * Get the payload for a password update.
   * @returns The payload for the password update.
   */
  protected getPayload(): RegistrationPayload {
    return this.utils.getRegistrationPayload(this.form);
  }

  /**
   * Request a password update from the Videoflix API.
   * @param payload - The payload for the password update.
   * @returns An Observable with the user response.
   */
  protected request$(payload: RegistrationPayload): Observable<UserResponse> {
    return this.auth.updatePassword(payload);
  }

  /**
   * Complete password update and redirect user to success page.
   */
  protected onSuccess(): void {
    this.form.reset();
    this.router.navigate(['success'], {
      relativeTo: this.route.parent,
      replaceUrl: true,
    });
  }

  /**
   * Show an error toast upon failed password update.
   * @param error - The error response.
   */
  protected onError(error: HttpErrorResponse): void {
    this.toasts.showError(error);
  }

  /**
   * Close error toast.
   */
  protected override destroyOptions(): void {
    this.toasts.close();
  }
}
