import { Directive, inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { DialogManager } from '../../shared/services/dialog-manager';
import { ToastManager } from '../../shared/services/toast-manager';
import { DialogIds } from '../../shared/ts/enums';
import { FormGroupControls } from '../interfaces/form-group-controls';

@Directive()
/**
 * Abstract class representing an auth form.
 */
export abstract class AuthForm implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);

  protected dialogs: DialogManager = inject(DialogManager);
  protected toasts: ToastManager = inject(ToastManager);

  // clean this class ...
  // group properties ...
  // think about private and protected ...

  // move this to folder directives ... !

  form!: FormGroup;

  protected options?: AbstractControlOptions | null;

  protected abstract controls: FormGroupControls;

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

  /**
   * Get a possible error caused by a password mismatch.
   * @returns A boolean value.
   */
  get matchError() {
    return this.form.hasError('passwordMismatch');
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
    return this.form.invalid;
  }
}
