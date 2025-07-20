import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { Videoflix } from '../../shared/services/videoflix';
import { InputValidation } from '../../shared/services/input-validation';
import { Authentication } from '../../shared/services/authentication';
import { FormValidator } from '../../shared/services/form-validator';
import { DialogManager } from '../../shared/services/dialog-manager';
import { ToastManager } from '../../shared/services/toast-manager';
import { ResetPasswordPayload } from '../../shared/interfaces/reset-password-payload';
import { DialogIds, ToastIds } from '../../shared/ts/enums';

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
  private validator: FormValidator = inject(FormValidator);
  private auth: Authentication = inject(Authentication);
  private dialogs: DialogManager = inject(DialogManager);
  private toasts: ToastManager = inject(ToastManager);

  private readonly routerURL: string = 'reset-password';

  form!: FormGroup;

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
   * Get a possible error caused by a password mismatch.
   * @returns A boolean value.
   */
  get matchError() {
    return this.form.hasError('passwordMismatch');
  }

  /**
   * Initialize a reset-password component.
   */
  ngOnInit(): void {
    this.setRouterURL();
    this.setForm();
    this.setDialogConfig();
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
    this.form = this.fb.group(
      {
        password: ['', this.validation.password],
        confirmPassword: ['', this.validation.password],
      },
      { validators: [this.validator.passwordMatch()] }
    );
  }

  /**
   * Set the dialog configuration of a success dialog.
   */
  private setDialogConfig() {
    this.dialogs.setConfig(DialogIds.ResetPasswordSuccess);
  }

  /**
   * Reset password on submit.
   * If successful, a success dialog opens.
   * Otherwise, an error toast is shown.
   */
  onPasswordReset() {
    const payload = this.getPayload();
    this.auth.updateUserPassword(payload).subscribe({
      next: () => this.openSuccessDialog(),
      error: () => this.openErrorToast(),
    });
  }

  /**
   * Get a reset-password payload.
   * @returns The reset-password payload.
   */
  private getPayload(): ResetPasswordPayload {
    return {
      token: 'be74f002e7c87632dd3ca97b37d4ed47d1db71b9',
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
   * Reset a reset-password form.
   */
  private resetForm() {
    this.form.reset({
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
   * Check a reset-password form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid;
  }
}
