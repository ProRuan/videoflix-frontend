import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthFormBase } from '@core/auth/directives';

import { PrimaryButton } from '@shared/components/buttons';
import { StartEmailInput } from '@shared/components/inputs';
import { FormValidator } from '@shared/modules/form-validation';

import { Videoflix } from '../../../../shared/services/videoflix';
import { FormGroupControls } from '../../../../shared/interfaces/form-group-controls';

/**
 * Class representing a startsite component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-startsite',
  imports: [ReactiveFormsModule, StartEmailInput, PrimaryButton],
  templateUrl: './startsite.html',
  styleUrl: './startsite.scss',
})
export class Startsite extends AuthFormBase {
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);

  protected controls: FormGroupControls = {
    email: ['', FormValidator.emailValidators],
  };

  /**
   * Perform an email check on submit before redirecting to the sign-up component.
   *
   * If successful, cache the email and redirect to the sign-up component.
   *
   * Otherwise, show an error toast.
   */
  onSignUp() {
    this.performRequest('checkEmail', () => this.handleSuccess());
  }

  /**
   * Cache the email and redirect to the sign-up component.
   */
  private handleSuccess() {
    this.toasts.close();
    this.videoflix.cachedEmail = this.email?.value;
    this.router.navigateByUrl('/sign-up');
  }
}
