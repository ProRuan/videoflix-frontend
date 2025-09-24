import { HttpErrorResponse } from '@angular/common/http';
import { Directive, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { finalize, Observable } from 'rxjs';

import { formGroupErrorMessages } from '@shared/modules/form-validation';

type Controls<T> = { [K in keyof T]: AbstractControl<any, any> };

/**
 * Class representing an authentication form base directive.
 *
 * Provides properties and methods for authentication forms and requests.
 *
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Directive()
export abstract class AuthFormBase<
  Form extends Controls<Form>,
  Payload,
  Response
> implements OnInit, OnDestroy
{
  form!: FormGroup<Form>;
  isLoading = signal(false);

  /**
   * Get a form´s email control.
   * @returns The form´s email control.
   */
  get email() {
    return this.form.get('email') as FormControl;
  }

  /**
   * Get a form´s password control.
   * @returns The form´s password control.
   */
  get password() {
    return this.form.get('password') as FormControl;
  }

  /**
   * Get a form´s confirm-password control.
   * @returns The form´s confirm-password control.
   */
  get confirmPassword() {
    return this.form.get('confirmPassword') as FormControl;
  }

  /**
   * Initialize an authentication form base.
   */
  ngOnInit(): void {
    this.setForm();
    this.initOptions();
  }

  /**
   * Set an authentication form.
   */
  private setForm() {
    this.form = this.getForm();
  }

  /**
   * Get an authentication form.
   * @returns The authentication form.
   */
  protected abstract getForm(): FormGroup<Form>;

  /**
   * Initialize optional settings, e. g. update values of form controls.
   */
  protected initOptions() {}

  /**
   * Request an authentication action from the Videoflix API on submit.
   * @returns Void.
   */
  onRequest() {
    if (this.isFormUnready()) return;
    this.isLoading.set(true);
    this.performRequest();
  }

  /**
   * Perform an authentication request to the Videoflix API.
   *
   * Handle response and further actions, if successful.
   *
   * Otherwise, handle error and user feedback.
   */
  private performRequest() {
    const payload = this.getPayload();
    this.request$(payload)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (value) => this.onSuccess(value),
        error: (error) => this.onError(error),
      });
  }

  /**
   * Get the payload for an authentication request.
   * @returns The payload for the authentication request.
   */
  protected abstract getPayload(): Payload;

  /**
   * Request an authentication action from the Videoflix API.
   * @param payload - The request payload.
   * @returns An Observable with the success response.
   */
  protected abstract request$(payload: Payload): Observable<Response>;

  /**
   * Handle success response and further actions.
   * @param response - The success response.
   */
  protected abstract onSuccess(response: Response): void;

  /**
   * Handle error response and further actions.
   * @param error - The error response.
   */
  protected abstract onError(error: HttpErrorResponse): void;

  /**
   * Check a form for unreadiness.
   * @returns True if the form is invalid or loading, otherwise false.
   */
  isFormUnready() {
    return this.form.invalid || this.isLoading() === true;
  }

  /**
   * Get a password match error or undefined.
   * @returns The password match error or undefined.
   */
  getMatchError() {
    const key = 'passwordMismatch';
    const error = this.form.getError(key);
    return error ? formGroupErrorMessages[key] : undefined;
  }

  /**
   * Destroy an authentication form base.
   */
  ngOnDestroy(): void {
    this.form.reset();
    this.destroyOptions();
  }

  /**
   * Destroy optional settings, e. g. close open dialogs or toasts.
   */
  protected destroyOptions() {}
}
