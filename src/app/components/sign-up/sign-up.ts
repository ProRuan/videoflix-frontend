import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Authentication } from '../../shared/services/authentication';
import { Videoflix } from '../../shared/services/videoflix';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { InputValidation } from '../../shared/services/input-validation';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { ErrorToast } from '../../shared/components/error-toast/error-toast';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    Header,
    EmailInput,
    PasswordInput,
    Footer,
    ErrorToast,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})

/**
 * Class representing a sign-up component.
 */
export class SignUp implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private validation: InputValidation = inject(InputValidation);

  // add error-toast component - in progress ...
  // add error-toast-cta component (e. g. button for continue video progress) ... !

  // check onRegister method ... !
  // create abstract class BaseComponent ... ?

  // https://angular.dev/guide/http/making-requests
  // use http response: 'body' or 'response' (status, body) - check
  // use catchError to display error - check

  // check your email dialog ... !
  // reset form on success/failure ... !

  // simplify computed signals (no extra function) ...
  // destroy subscriptions/signals ...

  // check!!!
  private videoflix: Videoflix = inject(Videoflix);
  private auth: Authentication = inject(Authentication);

  form!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  passwordConfirmed: boolean = false;

  changedPassword = signal('');
  changedConfirmPassword = signal('');
  isPasswordConfirmed = computed(() => this.isPasswordMatch());

  message: string = 'Registration failed. Please try again.';

  // check!!!
  preEmail: string = '';
  isHidden = signal(true);
  timeoutId!: ReturnType<typeof setTimeout>;

  /**
   * Creates a sign-up component.
   */
  constructor() {
    effect(() => this.updatePasswordConfirmation());
  }

  /**
   * Check password and confirm password for a match.
   * @returns A boolean value.
   */
  isPasswordMatch() {
    return this.changedPassword() === this.changedConfirmPassword();
  }

  /**
   * Update the state of a password confirmation.
   */
  updatePasswordConfirmation() {
    this.passwordConfirmed = this.isPasswordConfirmed();
  }

  ngOnInit(): void {
    this.videoflix.setRouterURL('sign-up');
    // this.preEmail = this.videoflix.preEmail;
    console.log('pre-email: ', this.videoflix.preEmail);

    this.setFormControls();
    this.setForm();
    this.subscribeChanges();

    this.email.setValue(this.videoflix.preEmail);
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
   * Get a form control.
   * @param value - The default value to set.
   * @param validators - The validators to set.
   * @returns The form control.
   */
  getFormControl(value: string, validators: ValidatorFn[]) {
    return new FormControl(value, validators);
  }

  /**
   * Set a sign-up form.
   */
  setForm() {
    this.form = this.fb.group({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  /**
   * Subscribe to value changes to update related signals.
   */
  subscribeChanges() {
    this.updateSignal(this.password, this.changedPassword);
    this.updateSignal(this.confirmPassword, this.changedConfirmPassword);
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
   * Check a form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid || !this.passwordConfirmed;
  }

  isMatchError() {
    return (
      this.password.valid &&
      this.confirmPassword.valid &&
      !this.passwordConfirmed
    );
  }

  onToastHide() {
    clearTimeout(this.timeoutId);
    this.isHidden.set(true);
  }

  // use variables!!!
  onRegister() {
    clearTimeout(this.timeoutId);

    const payload = {
      email: this.email?.value,
      password: this.password?.value,
      repeated_password: this.confirmPassword?.value,
    };

    // const payload = {
    //   username: 'luigiSpukhaus',
    //   email: 'spukhaus@mail.com',
    //   password: 'Test123!',
    //   repeated_password: 'Test123!',
    // };

    this.auth.registerUser(payload).subscribe({
      next: (response) => {
        const data = JSON.parse(response);
        console.log('data: ', data);
        console.log('token: ', data['token']);
        console.log('email: ', data['email']);
        console.log('user id: ', data['user_id']);

        this.isHidden.set(true);
        // console.log('response status: ', response.status);
        // console.log('response body: ', response.body);

        // Optional: Save token in localStorage
        // localStorage.setItem('auth_token', response.token);
      },
      error: (error) => {
        console.error('Registration failed', error);

        this.isHidden.set(false);
        this.timeoutId = setTimeout(() => {
          // 3000 or 5000?
          this.isHidden.set(true);
        }, 4000);
        // this.message = 'Registration failed. Please try again.';
      },
    });
  }
}
