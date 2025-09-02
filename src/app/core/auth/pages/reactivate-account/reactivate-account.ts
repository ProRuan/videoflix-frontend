import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormBase } from '@core/auth/directives';
import { FormGroupControls } from '@core/auth/interfaces';
import { Button } from '@shared/components/buttons';
import { EmailInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { DialogIds } from '@shared/constants';
import { FormValidator } from '@shared/modules/form-validation';

/**
 * Class representing a reactivate-account component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-reactivate-account',
  imports: [Button, ReactiveFormsModule, LoadingBar, EmailInput],
  templateUrl: './reactivate-account.html',
  styleUrl: './reactivate-account.scss',
})
export class ReactivateAccount extends AuthFormBase {
  protected override controls: FormGroupControls = {
    email: ['', FormValidator.emailValidators],
  };

  /**
   * Perform a reactivate-account request on submit.
   *
   * Opens a success dialog with further information on success;
   * shows an error toast on error.
   */
  onAccountReactivation() {
    this.performRequest('reactivateAccount', () => this.handleSuccess());
  }

  /**
   * Show a success dialog upon a successful account reactivation.
   */
  private handleSuccess() {
    this.showSuccessDialog(DialogIds.ReactivateAccountSuccess);
  }
}
