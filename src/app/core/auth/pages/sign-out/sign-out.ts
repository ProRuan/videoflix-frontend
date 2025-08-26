import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthFormBase } from '@core/auth/directives';
import { FormGroupControls } from '@core/auth/interfaces';
import { PrimaryButton } from '@shared/components/buttons';
import { EmailInput, PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { DialogIds } from '@shared/constants';
import { FormValidator } from '@shared/modules/form-validation';

/**
 * Class representing a sign-out component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-sign-out',
  imports: [
    ReactiveFormsModule,
    LoadingBar,
    EmailInput,
    PasswordInput,
    PrimaryButton,
  ],
  templateUrl: './sign-out.html',
  styleUrl: './sign-out.scss',
})
export class SignOut extends AuthFormBase {
  private route: ActivatedRoute = inject(ActivatedRoute);

  data = toSignal(this.route.data);
  response = computed(() => this.data()?.['response']);
  requestEmail = computed(() => this.response()?.email);

  protected controls: FormGroupControls = {
    email: [this.requestEmail(), FormValidator.emailValidators],
    password: ['', FormValidator.passwordValidators],
  };

  /**
   * Perform a user deregistration on submit.
   *
   * Opens a success dialog with further information on success;
   * shows an error toast on error.
   */
  onDeregistration() {
    this.performRequest('deregister', () => this.handleSuccess());
  }

  /**
   * Show a success dialog upon a successful user deregistration.
   */
  private handleSuccess() {
    this.showSuccessDialog(DialogIds.SignOutSuccess);
  }
}
