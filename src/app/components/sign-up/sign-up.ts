import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { Videoflix } from '../../shared/services/videoflix';
import { InputValidation } from '../../shared/services/input-validation';
import { FormValidator } from '../../shared/services/form-validator';
import { Authentication } from '../../shared/services/authentication';
import { DialogManager } from '../../shared/services/dialog-manager';
import { ToastManager } from '../../shared/services/toast-manager';
import { RegistrationPayload } from '../../shared/interfaces/registration-payload';
import { DialogIds, ToastIds } from '../../shared/ts/enums';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    Header,
    EmailInput,
    PasswordInput,
    PrimaryButton,
    Footer,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})

/**
 * Class representing a sign-up component.
 */
export class SignUp implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);
  private validator: FormValidator = inject(FormValidator);
  private auth: Authentication = inject(Authentication);
  private dialogs: DialogManager = inject(DialogManager);
  private toasts: ToastManager = inject(ToastManager);

  private readonly routerURL: string = 'sign-up';

  form!: FormGroup;

  /**
   * Get the email control of a sign-up form.
   * @returns The email control or null.
   */
  get email() {
    return this.form.get('email');
  }

  /**
   * Get the password control of a sign-up form.
   * @returns The password control or null.
   */
  get password() {
    return this.form.get('password');
  }

  /**
   * Get the confirm-password control of a sign-up form.
   * @returns The confirm-password control or null.
   */
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  /**
   * Get a possible error caused by a password mismatch.
   */
  get matchError() {
    return this.form.hasError('passwordMismatch');
  }

  /**
   * Initialize a sign-up component.
   */
  ngOnInit(): void {
    this.setRouterURL();
    this.setForm();
    this.updateEmail();
    this.setDialogConfig();
  }

  /**
   * Set the current router URL.
   */
  private setRouterURL() {
    this.videoflix.setRouterURL(this.routerURL);
  }

  /**
   * Set a sign-up form.
   */
  private setForm() {
    this.form = this.fb.group(
      {
        email: ['', this.validation.email],
        password: ['', this.validation.password],
        confirmPassword: ['', this.validation.password],
      },
      { validators: [this.validator.passwordMatch()] }
    );
  }

  /**
   * Update an email control with the cached email from the startsite form.
   */
  private updateEmail() {
    this.email?.setValue(this.videoflix.cachedEmail);
  }

  /**
   * Set the dialog configuration of a success dialog.
   */
  private setDialogConfig() {
    this.dialogs.setConfig(DialogIds.SignUpSuccess);
  }

  /**
   * Register a user on submit.
   * If successful, a success dialog opens.
   * Otherwise, an error toast is shown.
   */
  onRegistration() {
    const payload = this.getPayload();
    this.auth.registerUser(payload).subscribe({
      next: () => this.openSuccessDialog(),
      error: () => this.openErrorToast(),
    });
  }

  /**
   * Get a registration payload.
   * @returns The registration payload.
   */
  private getPayload(): RegistrationPayload {
    return {
      email: this.email?.value,
      password: this.password?.value,
      repeated_password: this.confirmPassword?.value,
    };
  }

  /**
   * Open a success dialog.
   */
  private openSuccessDialog() {
    this.resetForm();
    this.toasts.slideOutImmediately(ToastIds.ErrorToast);
    this.dialogs.open(DialogIds.SuccessDialog);
  }

  /**
   * Reset a sign-up form.
   */
  private resetForm() {
    this.form.reset({
      email: '',
      password: '',
      confirmPassword: '',
    });
  }

  /**
   * Open an error toast.
   */
  private openErrorToast() {
    this.toasts.open(ToastIds.ErrorToast);
  }

  /**
   * Check a sign-up form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid;
  }
}
