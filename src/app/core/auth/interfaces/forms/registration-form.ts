import { FormControl } from '@angular/forms';

import { LoginForm } from './login-form';

/**
 * Interface representing a registration form.
 * @extends LoginForm
 */
export interface RegistrationForm extends LoginForm {
  confirmPassword: FormControl<string>;
}
