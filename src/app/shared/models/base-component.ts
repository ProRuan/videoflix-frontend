import { inject } from '@angular/core';
import { FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { Videoflix } from '../services/videoflix';

export abstract class BaseComponent {
  protected fb: FormBuilder = inject(FormBuilder);
  protected videoflix: Videoflix = inject(Videoflix);

  abstract get routerURL(): string;

  setRouterURL() {
    this.videoflix.setRouterURL(this.routerURL);
  }

  /**
   * Get a form control.
   * @param value - The default value to set.
   * @param validators - The validators to set.
   * @returns The form control.
   */
  getFormControl(value: string, validators: ValidatorFn[]) {
    return new FormControl(value, validators);
  }
}
