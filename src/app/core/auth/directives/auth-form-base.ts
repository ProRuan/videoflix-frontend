import {
  Directive,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import {
  Authentication,
  EmailCheckResponse,
} from 'shared/services/authentication';
import { DialogManager } from 'shared/services/dialog-manager';
import { ToastManager } from 'shared/services/toast-manager';

import { DialogIds } from '@shared/constants';
import { formGroupErrorMessages } from '@shared/modules/form-validation';

import {
  AuthResponse,
  EmailPayload,
  FormGroupControls,
  LoginPayload,
  RegistrationPayload,
  ResetPasswordPayload,
} from '../interfaces';
import { Authenticator } from '../services/authenticator';
import { ResponseType } from '@shared/services/api-base';

// type MethodNames<T> = {
//   [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
// }[keyof T];
// type RequestMethod = MethodNames<Authentication>;

type ResponseTypes = AuthResponse | EmailCheckResponse;

type RequestMethod = keyof Authentication;

@Directive()
/**
 * Abstract class representing an auth form.
 */
export abstract class AuthFormBase implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  // move to pages ...
  // protected auth: Authenticator = inject(Authenticator);

  protected dialogs: DialogManager = inject(DialogManager);
  protected toasts: ToastManager = inject(ToastManager);

  // clean this class ...
  // group properties ...
  // think about private and protected ...

  // rename this to AuthBase and move it to folder directives ... !

  // pipe(finalize(() => this.isLoading.set(true))) ... !

  form!: FormGroup;

  protected options?: AbstractControlOptions | null;

  protected abstract controls: FormGroupControls;

  // set to false
  isLoading: WritableSignal<boolean> = signal(false);

  // use getPayload() instead ... ?
  abstract get payload(): any;

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

  // performRequest<T>(
  //   request: (payload: T) => Observable<ResponseType<T>>,
  //   handleSuccess: (response: ResponseType<T>) => void
  // ) {
  //   if (this.isFormInvalid()) return;
  //   this.isLoading.set(true);
  //   request(this.payload)
  //     .pipe(finalize(() => this.isLoading.set(false)))
  //     .subscribe({
  //       next: (response: ResponseType<T>) => handleSuccess(response),
  //       error: () => this.handleError(),
  //     });
  // }

  // rename options to config or separate method and options ...
  performRequest<T, U extends ResponseType<T>>(options: {
    request$: (payload: T) => Observable<U>;
    onSuccess: (response: U) => void;
  }) {
    if (this.isFormInvalid()) return;
    this.isLoading.set(true);
    this._performRequest(options.request$, {
      next: (response: U) => options.onSuccess(response),
      error: () => this.handleError(),
    });
  }

  _performRequest<T, U extends ResponseType<T>>(
    request$: (payload: T) => Observable<U>,
    options: {
      next: (response: U) => void;
      error: () => void;
    }
  ) {
    request$(this.payload)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(options);
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
}
