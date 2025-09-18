import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { AuthFormBase } from '@core/auth/directives';
import { AuthResponse, FormGroupControls } from '@core/auth/interfaces';
import { Button } from '@shared/components/buttons';
import { EmailInput, PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { FormValidator } from '@shared/modules/form-validation';

/**
 * Class representing a reset-password component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-reset-password',
  imports: [Button, ReactiveFormsModule, LoadingBar, EmailInput, PasswordInput],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword extends AuthFormBase {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  data: Signal<Data | undefined> = toSignal(this.route.data);
  response: Signal<AuthResponse> = computed(() => this.data()?.['response']);
  token: Signal<string> = computed(() => this.response()?.token);
  requestEmail: Signal<string> = computed(() => this.response()?.email);

  protected controls: FormGroupControls = {
    token: [this.token(), FormValidator.tokenValidators],
    email: [this.requestEmail(), FormValidator.emailValidators],
    password: ['', FormValidator.passwordValidators],
    confirmPassword: ['', FormValidator.passwordValidators],
  };

  protected override options: AbstractControlOptions | null = {
    validators: FormValidator.formValidators,
  };

  /**
   * Perform an update-password request on submit.
   *
   * Redirect to the reset-passsword success page on success;
   * shows an error toast on error.
   */
  onPasswordUpdate() {
    this.performRequest('updatePassword', () => this.handleSuccess());
  }

  /**
   * Redirect to the reset-password success page.
   */
  private handleSuccess(): void {
    this.toasts.close();
    this.router.navigateByUrl('/reset-password/success');
  }
}
