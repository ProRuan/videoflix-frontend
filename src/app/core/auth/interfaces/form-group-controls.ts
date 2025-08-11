import { ValidatorFn } from '@angular/forms';

/**
 * Interface representing form group controls.
 */
export interface FormGroupControls {
  [key: string]: [string, ValidatorFn[]?];
}
