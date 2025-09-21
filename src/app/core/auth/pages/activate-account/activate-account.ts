import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthFormBase } from '@core/auth/directives';
import { TokenForm, TokenPayload, UserResponse } from '@core/auth/interfaces';
import { AuthStore, AuthUtils } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { LoadingBar } from '@shared/components/loaders';
import { ToastManager } from '@shared/services';

/**
 * Class representing an activate-account component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-activate-account',
  imports: [Button, LoadingBar, ReactiveFormsModule],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss',
})
export class ActivateAccount extends AuthFormBase<
  TokenForm,
  TokenPayload,
  UserResponse
> {
  route = inject(ActivatedRoute);
  router = inject(Router);
  auth = inject(AuthStore);
  utils = inject(AuthUtils);
  toasts = inject(ToastManager);

  data = toSignal(this.route.data);
  token = computed(() => this.data()?.['token'] as string);

  /**
   * Get a token form.
   * @returns The token form.
   */
  getForm(): FormGroup<TokenForm> {
    return this.utils.getTokenForm();
  }

  /**
   * Update the token control with the account activation token.
   */
  override initOptions(): void {
    this.form.get('token')?.setValue(this.token());
  }

  /**
   * Get the payload for an account activation.
   * @returns The payload for the account activation.
   */
  getPayload(): TokenPayload {
    return this.utils.getTokenPayload(this.form);
  }

  /**
   * Request an account activation from the Videoflix API.
   * @param payload - The payload for an account activation.
   * @returns An Observable with the user response.
   */
  request$(payload: TokenPayload): Observable<UserResponse> {
    return this.auth.activateAccount(payload);
  }

  /**
   * Complete account activation and redirect user to success page.
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
    this.toasts.openError(error);
  }
}
