import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { Videoflix } from '../../shared/services/videoflix';
import { InputValidation } from '../../shared/services/input-validation';
import { Authentication } from '../../shared/services/authentication';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, Header, PasswordInput, PrimaryButton, Footer],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})

/**
 * Class representing a reset-password component.
 */
export class ResetPassword implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);
  private auth: Authentication = inject(Authentication);

  // add success dialog ...
  // add (global) error toast ...
  // add FormValidator.passwordMismatch() - no signals or double logic ...

  // no getters and helper methods --> use form in html instead ... ?

  private readonly routerURL: string = 'reset-password';

  form!: FormGroup;

  value: WritableSignal<string> = signal('');
  confirmValue: WritableSignal<string> = signal('');
  isPasswordMismatch: Signal<boolean> = computed(
    () => this.value() !== this.confirmValue()
  );

  /**
   * Get the password control of a reset-password form.
   * @returns The password control or null.
   */
  get password() {
    return this.form.get('password');
  }

  /**
   * Get the confirm-password control of a reset-password form.
   * @returns The confirm-password control or null.
   */
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  /**
   * Initialize a reset-password component.
   */
  ngOnInit(): void {
    this.setRouterURL();
    this.setForm();
    this.subscribePasswords();
  }

  /**
   * Set the current router URL.
   */
  private setRouterURL() {
    this.videoflix.setRouterURL(this.routerURL);
  }

  /**
   * Set a reset-password form.
   */
  private setForm() {
    this.form = this.fb.group({
      password: ['', this.validation.password],
      confirmPassword: ['', this.validation.password],
    });
  }

  /**
   * Subscribe to password changes to update related signals.
   */
  private subscribePasswords() {
    this.updateSignal(this.password, this.value);
    this.updateSignal(this.confirmPassword, this.confirmValue);
  }

  /**
   * Update a signal when the related form control value changes.
   * @param control - The form control to subscribe to.
   * @param signal - The signal to update.
   */
  private updateSignal(
    control: AbstractControl | null,
    signal: WritableSignal<string>
  ) {
    control?.valueChanges.subscribe({
      next: (value: string) => signal.set(value),
    });
  }

  // think about name ... !
  // add dialog ... ?
  // add error toast ... !
  onPasswordReset() {
    const payload = this.getPayload();
    this.auth.updateUserPassword(payload).subscribe({
      next: (response) => console.log('response: ', response),
      error: () => console.log('error'),
    });
  }

  // token must be a variable ... !
  // use email instead of token ... !
  private getPayload() {
    return {
      token: 'be74f002e7c87632dd3ca97b37d4ed47d1db71b9',
      password: this.password?.value,
      repeated_password: this.confirmPassword?.value,
    };
  }

  /**
   * Check passwords for validity and match.
   * @returns A boolean value.
   */
  isMatchError() {
    return this.arePasswordsValid() && this.isPasswordMismatch();
  }

  /**
   * Check password and confirm password for validity.
   * @returns A boolean value.
   */
  private arePasswordsValid() {
    const passwordValid = this.password?.valid ?? false;
    const confirmPasswordValid = this.confirmPassword?.valid ?? false;
    return passwordValid && confirmPasswordValid;
  }

  isFormInvalid() {
    return this.form.invalid;
  }
}
