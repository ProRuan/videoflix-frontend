import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AUTH_TOAST_CONFIG } from '@core/auth/constants';
import { AuthFormBase } from '@core/auth/directives';
import { EmailForm, EmailPayload, EmailResponse } from '@core/auth/interfaces';
import { AuthFormUtils, AuthStore, UserClient } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { StartEmailInput } from '@shared/components/inputs';
import { ToastConfig } from '@shared/interfaces';
import { ToastManager } from '@shared/services';

/**
 * Class representing a startsite component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-startsite',
  imports: [Button, ReactiveFormsModule, StartEmailInput],
  templateUrl: './startsite.html',
  styleUrl: './startsite.scss',
})
export class Startsite extends AuthFormBase<
  EmailForm,
  EmailPayload,
  EmailResponse
> {
  private router = inject(Router);
  private auth = inject(AuthStore);
  private utils = inject(AuthFormUtils);
  private user = inject(UserClient);
  private toasts = inject(ToastManager);

  // fix heading two-liners ... !

  // responsiveness 320/368/400 + 768/1280 + 1440/1920 + 1920+
  // --------------
  // auth-pages (0/9) ...
  // video-pages (0/2) ...
  // header, footer (0/2) ...
  // static-pages (0/2) ...
  // shared-pages (0/2) ...

  // media 320/368/400 + 768/1280 + 1440/1920 + 1920+ + height ...
  // ------------------------------------------------
  // startsite, sign-up, log-in, forgot-password, reset-password (1/5) ...
  // activate-account (0/4) ...

  // success-dialog ...
  // error-toast ...

  // error-page ...
  // token-page ...

  // video-settings-dialog ...

  // global auth-text ... ?

  // mobile-text on mobiles only ... !
  // create mobile service with isMobile an so on ... ?

  private readonly error: ToastConfig = AUTH_TOAST_CONFIG.startsite;

  /**
   * Get an email form.
   * @returns The email form.
   */
  protected getForm(): FormGroup<EmailForm> {
    return this.utils.getEmailForm();
  }

  /**
   * Get the payload for an email check.
   * @returns The payload for the email check.
   */
  protected getPayload(): EmailPayload {
    return this.utils.getEmailPayload(this.form);
  }

  /**
   * Request an email check from the Videoflix API.
   * @param payload - The payload for the email check.
   * @returns An Observable with the response of the email check.
   */
  protected request$(payload: EmailPayload): Observable<EmailResponse> {
    return this.auth.checkEmail(payload);
  }

  /**
   * Complete email check and redirect user to sign-up.
   * @param response - The response of the email check.
   */
  protected onSuccess(response: EmailResponse): void {
    this.form.reset();
    this.user.startEmail = response.email;
    this.router.navigateByUrl('/sign-up');
  }

  /**
   * Show an error toast upon failed email check.
   * @param error - The error response.
   */
  protected onError(error: HttpErrorResponse): void {
    this.toasts.showError(error, this.error);
  }

  /**
   * Close error toast.
   */
  protected override destroyOptions(): void {
    this.toasts.close();
  }
}
