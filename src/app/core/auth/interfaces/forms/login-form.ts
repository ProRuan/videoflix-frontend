import { FormControl } from '@angular/forms';

import { EmailForm } from './email-form';

/**
 * Interface representing a login form.
 * @extends EmailForm
 */
export interface LoginForm extends EmailForm {
  password: FormControl<string>;
}
