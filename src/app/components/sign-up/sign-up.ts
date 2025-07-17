import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
import { RegistrationPayload } from '../../shared/interfaces/registration-payload';
import {
  animateOnLeave,
  getFormControl,
  hideElement,
} from '../../shared/ts/utils';

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
  private elementRef: ElementRef = inject(ElementRef);
  private fb: FormBuilder = inject(FormBuilder);
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);
  private auth: Authentication = inject(Authentication);

  private readonly routerURL: string = 'sign-up';

  form!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;

  private value: WritableSignal<string> = signal('');
  private confirmValue: WritableSignal<string> = signal('');
  private isPasswordMismatch: Signal<boolean> = computed(
    () => this.value() !== this.confirmValue()
  );

  isDialogOpened: WritableSignal<boolean> = signal(false);
  isZoomOutActive: WritableSignal<boolean> = signal(false);

  message: string = 'Please check your input and try again.';
  isToastOpened: WritableSignal<boolean> = signal(false);
  isSlideOutActive: WritableSignal<boolean> = signal(false);
  timeoutId!: ReturnType<typeof setTimeout>;

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
    this.setFormControls();
    this.setFormGroup();
  }

  /**
   * Set form controls for email, password and confirm password.
   */
  private setFormControls() {
    this.email = getFormControl('', this.validation.email);
    this.password = getFormControl('', this.validation.password);
    this.confirmPassword = getFormControl('', this.validation.password);
  }

  /**
   * Set a form group composed of email, password and confirm password control.
   */
  private setFormGroup() {
    this.form = this.fb.group({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  /**
   * Update an email control with the cached email provided by the startsite form.
   */
  private updateEmail() {
    this.email.setValue(this.videoflix.cachedEmail);
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
  private updateSignal(control: FormControl, signal: WritableSignal<string>) {
    control.valueChanges.subscribe({
      next: (value: string) => signal.set(value),
    });
  }

  /**
   * Register a user on submit.
   * If successful, a success dialog opens.
   * Otherwise, an error toast is shown.
   */
  onRegistration() {
    clearTimeout(this.timeoutId);
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
    this.isToastOpened.set(false);
    this.isDialogOpened.set(true);
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
   * Open an error toast for four seconds.
   */
  private openErrorToast() {
    this.isToastOpened.set(true);
    this.timeoutId = setTimeout(() => this.slideOutToast(), 4000);
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
    return this.password.valid && this.confirmPassword.valid;
  }

  /**
   * Check a sign-up form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid || this.isPasswordMismatch();
  }

  /**
   * Close a dialog on click.
   */
  onDialogClose() {
    this.zoomOutDialog();
  }

  /**
   * Animate a dialog with "zoom out" when it leaves the HTML DOM.
   */
  private zoomOutDialog() {
    animateOnLeave(this.elementRef, '.dialog', () => this.hideDialog());
    this.isZoomOutActive.set(true);
  }

  /**
   * Hide a dialog by removing it from the HTML DOM.
   */
  private hideDialog() {
    hideElement(this.isDialogOpened, this.isZoomOutActive);
  }

  /**
   * Close a toast on click.
   */
  onToastClose() {
    clearTimeout(this.timeoutId);
    this.slideOutToast();
  }

  /**
   * Animate an toast with "slide out" when it leaves the HTML DOM.
   */
  private slideOutToast() {
    animateOnLeave(this.elementRef, '.toast', () => this.hideToast());
    this.isSlideOutActive.set(true);
  }

  /**
   * Hide a toast by removing it from the HTML DOM.
   */
  private hideToast() {
    hideElement(this.isToastOpened, this.isSlideOutActive);
  }
}
