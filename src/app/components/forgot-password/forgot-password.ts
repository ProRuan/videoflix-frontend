import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { InputValidation } from '../../shared/services/input-validation';
import { Authentication } from '../../shared/services/authentication';
import { DialogManager } from '../../shared/services/dialog-manager';
import { ToastManager } from '../../shared/services/toast-manager';
import { ForgotPasswordPayload } from '../../shared/interfaces/forgot-password-payload';
import { DialogIds, ToastIds } from '../../shared/ts/enums';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, Header, EmailInput, PrimaryButton, Footer],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})

/**
 * Class representing a forgot-password component.
 */
export class ForgotPassword implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private validation: InputValidation = inject(InputValidation);
  private auth: Authentication = inject(Authentication);
  private dialogs: DialogManager = inject(DialogManager);
  private toasts: ToastManager = inject(ToastManager);

  form!: FormGroup;

  /**
   * Get the email control of a forgot-password form.
   * @returns The email control or null.
   */
  get email() {
    return this.form.get('email');
  }

  /**
   * Initialize a forgot-password component.
   */
  ngOnInit(): void {
    this.setForm();
    this.setDialogConfig();
  }

  /**
   * Set a forgot-password form.
   */
  private setForm() {
    this.form = this.fb.group({
      email: ['', this.validation.email],
    });
  }

  /**
   * Set the configuration of a success dialog.
   */
  private setDialogConfig() {
    this.dialogs.setConfig(DialogIds.ForgotPasswordSuccess);
  }

  /**
   * Send a password-reset email on submit.
   * If successful, an email is sent.
   * Otherwise, an error toast is shown.
   */
  onEmailSend() {
    const payload = this.getPayload();
    this.auth.requestPasswordReset(payload).subscribe({
      next: () => this.openSuccessDialog(),
      error: () => this.openErrorToast(),
    });
  }

  /**
   * Get a forgot-password payload.
   * @returns The forgot-password payload.
   */
  private getPayload(): ForgotPasswordPayload {
    return {
      email: this.email?.value,
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
   * Reset a forgot-password form.
   */
  private resetForm() {
    this.form.reset({
      email: '',
    });
  }

  /**
   * Open an error toast.
   */
  private openErrorToast() {
    this.toasts.open(ToastIds.ErrorToast);
  }

  /**
   * Check a forgot-password form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid;
  }
}
