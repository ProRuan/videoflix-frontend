import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthFormBase } from '@core/auth/directives';
import { EmailResponse, LoginForm, LoginPayload } from '@core/auth/interfaces';
import { AuthStore, AuthUtils } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { EmailInput, PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { DialogIds } from '@shared/constants';
import { DialogManager, ToastManager } from '@shared/services';

/**
 * Class representing a sign-out component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-sign-out',
  imports: [Button, EmailInput, LoadingBar, PasswordInput, ReactiveFormsModule],
  templateUrl: './sign-out.html',
  styleUrl: './sign-out.scss',
})
export class SignOut extends AuthFormBase<
  LoginForm,
  LoginPayload,
  EmailResponse
> {
  private route = inject(ActivatedRoute);
  private auth = inject(AuthStore);
  private utils = inject(AuthUtils);
  private dialogs = inject(DialogManager);
  private toasts = inject(ToastManager);

  data = toSignal(this.route.data);
  requestEmail = computed(() => this.data()?.['email'] as string);

  /**
   * Get a deregistration form.
   * @returns The deregistration form.
   */
  getForm(): FormGroup<LoginForm> {
    return this.utils.getLoginForm();
  }

  /**
   * Update the email control with the user´s email.
   */
  override initOptions(): void {
    this.email.setValue(this.requestEmail());
  }

  /**
   * Get the payload for a deregistration.
   * @returns The payload for the deregistration.
   */
  getPayload(): LoginPayload {
    return this.utils.getLoginPayload(this.form);
  }

  /**
   * Request a deregistration from the Videoflix API.
   * @param payload - The payload for the deregistration.
   * @returns An Observable with the email response.
   */
  request$(payload: LoginPayload): Observable<EmailResponse> {
    return this.auth.deregister(payload);
  }

  /**
   * Show a success dialog upon a successful deregistration.
   */
  onSuccess(): void {
    this.toasts.close();
    this.dialogs.openSuccessDialog(DialogIds.SignOutSuccess);
  }

  /**
   * Handle error response and further actions.
   * @param error - The error response.
   */
  onError(error: HttpErrorResponse): void {
    this.toasts.openError(error);
  }
}
