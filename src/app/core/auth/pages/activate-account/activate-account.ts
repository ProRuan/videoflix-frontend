import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthFormBase } from '@core/auth/directives';
import { TokenForm, TokenPayload, UserResponse } from '@core/auth/interfaces';
import { AuthFormUtils, AuthStore } from '@core/auth/services';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthStore);
  private utils = inject(AuthFormUtils);
  private toasts = inject(ToastManager);

  private data = toSignal(this.route.data);
  private token = computed(() => this.data()?.['token'] as string);

  /**
   * Get a token form.
   * @returns The token form.
   */
  protected getForm(): FormGroup<TokenForm> {
    return this.utils.getTokenForm();
  }

  /**
   * Update the token control with the account activation token.
   */
  protected override initOptions(): void {
    this.form.get('token')?.setValue(this.token());
  }

  /**
   * Get the payload for an account activation.
   * @returns The payload for the account activation.
   */
  protected getPayload(): TokenPayload {
    return this.utils.getTokenPayload(this.form);
  }

  /**
   * Request an account activation from the Videoflix API.
   * @param payload - The payload for an account activation.
   * @returns An Observable with the user response.
   */
  protected request$(payload: TokenPayload): Observable<UserResponse> {
    return this.auth.activateAccount(payload);
  }

  /**
   * Complete account activation and redirect user to success page.
   */
  protected onSuccess(): void {
    this.form.reset();
    this.router.navigate(['success'], {
      relativeTo: this.route.parent,
      replaceUrl: true,
    });
  }

  /**
   * Show an error toast upon failed account activation.
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
