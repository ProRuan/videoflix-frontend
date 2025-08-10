import {
  Directive,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { Authentication } from 'shared/services/authentication';
import { DialogManager } from 'shared/services/dialog-manager';
import { ToastManager } from 'shared/services/toast-manager';
import { FormGroupControls } from 'shared/interfaces/form-group-controls';
import { DialogIds } from 'shared/ts/enums';
import { formGroupErrorMessages } from '@shared/modules/form-validation';

// type MethodNames<T> = {
//   [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
// }[keyof T];
// type RequestMethod = MethodNames<Authentication>;

type RequestMethod = keyof Authentication;

@Directive()
/**
 * Abstract class representing an auth form.
 */
export abstract class AuthFormBase implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private auth: Authentication = inject(Authentication);

  protected dialogs: DialogManager = inject(DialogManager);
  protected toasts: ToastManager = inject(ToastManager);

  // clean this class ...
  // group properties ...
  // think about private and protected ...

  // rename this to AuthBase and move it to folder directives ... !

  form!: FormGroup;

  protected options?: AbstractControlOptions | null;

  protected abstract controls: FormGroupControls;

  // set to false
  isLoading: WritableSignal<boolean> = signal(false);

  /**
   * Get the email control of a form.
   * @returns The email control or null.
   */
  get email() {
    return this.form.get('email');
  }

  /**
   * Get the password control of a form.
   * @returns The password control or null.
   */
  get password() {
    return this.form.get('password');
  }

  /**
   * Get the confirm-password control of a form.
   * @returns The confirm-password control or null.
   */
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  getMatchError() {
    const key = 'passwordMismatch';
    const error = this.form.getError(key);
    return error ? formGroupErrorMessages[key] : undefined;
  }

  ngOnInit(): void {
    this.setForm();
  }

  protected setForm() {
    this.form = this.getForm();
  }

  protected getForm() {
    return this.fb.group(this.controls, this.options);
  }

  getPayload() {
    const formData: Record<string, string> = this.form?.value;
    const payload: Record<string, string> = {};
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'confirmPassword') {
        payload['repeated_password'] = value;
      } else {
        payload[key] = value;
      }
    }
    console.log('payload: ', payload);
    return payload;
  }

  /**
   * Show an error toast upon a failed request.
   */
  protected handleError() {
    this.toasts.openErrorToast();
  }

  /**
   * Show a success dialog.
   * @param id - The success dialog id.
   */
  protected showSuccessDialog(id: DialogIds) {
    this.form.reset();
    this.toasts.slideOutImmediately();
    this.dialogs.openSuccessDialog(id);
  }

  /**
   * Check a sign-up form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid || this.isLoading();
  }

  performRequest<T>(method: RequestMethod, handleSuccess: (value: T) => void) {
    if (this.isFormInvalid()) return;
    this.isLoading.set(true);
    const payload = this.getPayload();
    this.auth[method](payload)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (value) => handleSuccess(value),
        error: () => this.handleError(),
      });
  }
}
