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
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Authentication } from '../../shared/services/authentication';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputValidation } from '../../shared/services/input-validation';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { ErrorToast } from '../../shared/components/error-toast/error-toast';
import { BaseComponent } from '../../shared/models/base-component';
import { SignUpSuccessfulDialog } from './sign-up-successful-dialog/sign-up-successful-dialog';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    Header,
    EmailInput,
    PasswordInput,
    Footer,
    ErrorToast,
    SignUpSuccessfulDialog,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})

/**
 * Class representing a sign-up component.
 */
export class SignUp extends BaseComponent implements OnInit {
  private validation: InputValidation = inject(InputValidation);

  // check!!!
  private auth: Authentication = inject(Authentication);

  // clean code of registration-successful dialog ...
  // think about error-toast width/max-width ...
  // set button type submit/button ... !

  // fix sign-up-successful-dialog button "center" ...
  // animate dialog-box as well ...
  // choose button color gray-scaled instead of filter:grayscale ...

  readonly routerURL: string = 'sign-up';

  form!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;

  private value: WritableSignal<string> = signal('');
  private confirmValue: WritableSignal<string> = signal('');
  private isPasswordMatch: Signal<boolean> = computed(
    () => this.value() === this.confirmValue()
  );

  isDialogHidden = signal(true);

  message: string = 'Please check your input and try again.';
  isToastHidden = signal(true);
  timeoutId!: ReturnType<typeof setTimeout>;

  // check!!!
  deleting = signal(false);
  element = inject(ElementRef);

  fadeOut = signal(false);

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
   * Set a sign-up form.
   */
  setForm() {
    this.setFormControls();
    this.setFormGroup();
  }

  /**
   * Set form controls for email, password and confirm password.
   */
  setFormControls() {
    this.email = this.getFormControl('', this.validation.email);
    this.password = this.getFormControl('', this.validation.password);
    this.confirmPassword = this.getFormControl('', this.validation.password);
  }

  /**
   * Set a form group composed of email, password and confirm password control.
   */
  setFormGroup() {
    this.form = this.fb.group({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  /**
   * Update an email control with the cached email got from the startsite form.
   */
  updateEmail() {
    this.email.setValue(this.videoflix.cachedEmail);
  }

  /**
   * Subscribe to password changes to update related signals.
   */
  subscribePasswords() {
    this.updateSignal(this.password, this.value);
    this.updateSignal(this.confirmPassword, this.confirmValue);
  }

  /**
   * Update a signal when the related form control value changes.
   * @param control - The form control to subscribe to.
   * @param signal - The signal to update.
   */
  updateSignal(control: FormControl, signal: WritableSignal<string>) {
    control.valueChanges.subscribe({
      next: (value: string) => signal.set(value),
    });
  }

  /**
   * Check passwords for validity and match.
   * @returns A boolean value.
   */
  isMatchError() {
    return this.arePasswordsValid() && !this.isPasswordMatch();
  }

  /**
   * Check password and confirm password for validity.
   * @returns A boolean value.
   */
  arePasswordsValid() {
    return this.password.valid && this.confirmPassword.valid;
  }

  /**
   * Check a form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid || !this.isPasswordMatch();
  }

  /**
   * Clear timeout and close error toast immediately.
   */
  onToastClose() {
    clearTimeout(this.timeoutId);
    this.slideOutToast();
  }

  slideOutToast() {
    const target = this.element.nativeElement.querySelector('app-error-toast');
    target.addEventListener('transitionend', () => this.hide());
    this.deleting.set(true);
  }

  hide() {
    this.isToastHidden.set(true);
    this.deleting.set(false);
  }

  // finalize + rename onRegister() ...
  onRegister() {
    clearTimeout(this.timeoutId);
    const payload = this.getPayload();
    this.auth.registerUser(payload).subscribe({
      next: (response) => this.openDialog(response),
      error: () => this.showErrorToast(),
    });
  }

  /**
   * Gets a payload.
   * @returns The payload.
   */
  private getPayload() {
    return {
      email: this.email?.value,
      password: this.password?.value,
      repeated_password: this.confirmPassword?.value,
    };
  }

  // review and rename method ...
  private openDialog(response: any) {
    const data = JSON.parse(response);
    console.log('data: ', data);
    this.form.reset({
      email: '',
      password: '',
      confirmPassword: '',
    });
    this.isToastHidden.set(true);
    this.isDialogHidden.set(false);
  }

  onClose() {
    this.fadeOutDialog();
  }

  fadeOutDialog() {
    const target = this.element.nativeElement.querySelector(
      'app-sign-up-successful-dialog'
    );
    target.addEventListener('transitionend', () => this.close());
    this.fadeOut.set(true);
  }

  close() {
    this.isDialogHidden.set(true);
    this.fadeOut.set(false);
  }

  onEventStop(event: Event) {
    event.stopPropagation();
  }

  /**
   * Show an error toast for four seconds.
   */
  private showErrorToast() {
    this.isToastHidden.set(false);
    this.timeoutId = setTimeout(() => this.slideOutToast(), 4000);
  }
}
