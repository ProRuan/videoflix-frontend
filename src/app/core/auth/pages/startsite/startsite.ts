import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PrimaryButton } from '@shared/components/buttons';
import { StartEmailInput } from '@shared/components/inputs';

import { AuthForm } from '../../../../shared/models/auth-form';
import { Videoflix } from '../../../../shared/services/videoflix';
import { InputValidation } from '../../../../shared/services/input-validation';
import { FormGroupControls } from '../../../../shared/interfaces/form-group-controls';

/**
 * Class representing a startsite component.
 * @extends AuthForm
 */
@Component({
  selector: 'app-startsite',
  imports: [ReactiveFormsModule, StartEmailInput, PrimaryButton],
  templateUrl: './startsite.html',
  styleUrl: './startsite.scss',
})
export class Startsite extends AuthForm {
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);

  protected controls: FormGroupControls = {
    email: ['', this.validation.email],
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
