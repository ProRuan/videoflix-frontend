import {
  Directive,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';

import { finalize, Observable } from 'rxjs';

import { DialogIds } from '@shared/constants';
import { formGroupErrorMessages } from '@shared/modules/form-validation';
import { DialogManager, ToastManager } from '@shared/services';

import { FormGroupControls } from '../interfaces';
import { AuthStore } from '../services';
import { PayloadOf, RequestMethod, ResponseOf } from '../types';

/**
 * Abstract class representing an auth form base.
 *
 * Provides common properties and methods related to authentication forms.
 *
 * @implements {OnInit}
 */
@Directive()
export abstract class AuthFormBase implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private auth: AuthStore = inject(AuthStore);
  protected dialogs: DialogManager = inject(DialogManager);
  protected toasts: ToastManager = inject(ToastManager);

  form!: FormGroup;
  protected abstract controls: FormGroupControls;
  protected options?: AbstractControlOptions | null;
  isLoading: WritableSignal<boolean> = signal(false);

  private readonly requestMethodError = [
    'Request method undefined.',
    'Please implement the interface AuthRequests on the Authenticator service,',
    'and add the missing request method.',
  ].join(' ');

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
   * Initializes an auth form base.
   */
  ngOnInit(): void {
    this.setForm();
  }

  /**
   * Set a form.
   */
  protected setForm() {
    this.form = this.getForm();
  }

  /**
   * Get a form.
   * @returns The form.
   */
  protected getForm() {
    return this.fb.group(this.controls, this.options);
  }

  /**
   * Perform a API request.
   *
   * Calls a provided method on success;
   * shows an error toast on error.
   *
   * @param key - The request method key.
   * @param onSuccess - The method to be called on success.
   */
  protected performRequest<T extends RequestMethod>(
    key: T,
    onSuccess: (response: ResponseOf<T>) => void
  ) {
    if (this.isFormInvalid()) return;
    this.isLoading.set(true);
    const request$ = this.getRequest$<T>(key);
    request$.pipe(finalize(() => this.isLoading.set(false))).subscribe({
      next: (value: ResponseOf<T>) => onSuccess(value),
      error: () => this.handleError(),
    });
  }

  /**
   * Check a sign-up form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid || this.isLoading();
  }

  /**
   * Get a request observable with a specified response type.
   * @param key - The request method key of the authenticator.
   * @returns The request observable with the specified response type.
   */
  private getRequest$<T extends RequestMethod>(
    key: keyof AuthStore
  ): Observable<ResponseOf<T>> {
    const payload = this.getPayload<T>();
    const request$ = this.auth[key]?.(payload);
    if (typeof request$ === 'undefined') {
      this.isLoading.set(false);
      throw new Error(this.requestMethodError);
    }
    return request$;
  }

  /**
   * Get a payload for an API request.
   * @returns The payload for the API request.
   */
  private getPayload<T extends RequestMethod>(): PayloadOf<T> {
    const payload = this.form?.value;
    if (Object.keys(payload).includes('confirmPassword')) {
      payload.repeated_password = payload.confirmPassword;
      delete payload.confirmPassword;
    }
    return payload;
  }

  /**
   * Show an error toast upon a failed request.
   */
  protected handleError() {
    this.toasts.openErrorToast();
  }

  /**
   * Get a password match error.
   * @returns The password match error or undefined.
   */
  getMatchError() {
    const key = 'passwordMismatch';
    const error = this.form.getError(key);
    return error ? formGroupErrorMessages[key] : undefined;
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
}
