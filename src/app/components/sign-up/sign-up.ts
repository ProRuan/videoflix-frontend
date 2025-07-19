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
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { ErrorToast } from '../../shared/components/error-toast/error-toast';
import { SignUpSuccessDialog } from './sign-up-success-dialog/sign-up-success-dialog';
import { Videoflix } from '../../shared/services/videoflix';
import { InputValidation } from '../../shared/services/input-validation';
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
    ErrorToast,
    SignUpSuccessDialog,
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
  private auth: Authentication = inject(Authentication);
  private dialogs: DialogManager = inject(DialogManager);
  private toasts: ToastManager = inject(ToastManager);

  private readonly routerURL: string = 'sign-up';

  form!: FormGroup;

  private value: WritableSignal<string> = signal('');
  private confirmValue: WritableSignal<string> = signal('');
  private isPasswordMismatch: Signal<boolean> = computed(
    () => this.value() !== this.confirmValue()
  );

  message: string = 'Please check your input and try again.';

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
   * Initialize a sign-up component.
   */
  ngOnInit(): void {
    this.setRouterURL();
    this.setForm();
    this.updateEmail();
    this.subscribePasswords();
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
    this.form = this.fb.group({
      email: ['', this.validation.email],
      password: ['', this.validation.password],
      confirmPassword: ['', this.validation.password],
    });
  }

  /**
   * Update an email control with the cached email provided by the startsite form.
   */
  private updateEmail() {
    this.email?.setValue(this.videoflix.cachedEmail);
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
    this.toasts.slideOut(ToastIds.ErrorToast);
    this.dialogs.open(DialogIds.SignUpSuccess);
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

  /**
   * Check a sign-up form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid || this.isPasswordMismatch();
  }

  /**
   * Check a success dialog for its open state.
   * @returns A boolean value.
   */
  isDialogOpen() {
    return this.dialogs.isOpen(DialogIds.SignUpSuccess);
  }

  /**
   * Check an error toast for its open state.
   * @returns A boolean value.
   */
  isToastOpen() {
    return this.toasts.isOpen(ToastIds.ErrorToast);
  }
}
