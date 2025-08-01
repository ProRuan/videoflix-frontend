import { ValidatorFn } from '@angular/forms';

/**
 * Interface representing controls of a form group.
 */
export interface FormGroupControls {
  [key: string]: Array<string | ValidatorFn[]>;
}
