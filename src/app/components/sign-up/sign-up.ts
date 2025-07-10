import {
  Component,
  computed,
  effect,
  inject,
  Input,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Authentication } from '../../shared/services/authentication';
import { Videoflix } from '../../shared/services/videoflix';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { InputValidation } from '../../shared/services/input-validation';
import { EmailInput } from '../../shared/components/email-input/email-input';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, Header, EmailInput, PasswordInput, Footer],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})

/**
 * Class representing a sign-up component.
 */
export class SignUp implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private validation: InputValidation = inject(InputValidation);

  // check!!!
  private videoflix: Videoflix = inject(Videoflix);
  private auth: Authentication = inject(Authentication);

  // create EmailInputComponent ...
  // create PasswordInputComponent ...
  // replace hex with rgba values (from Figma) ...
  // check image (bg) size ... !
  // center elements by parents (only containers with simple elements) ...
  //   --> startsite, log-in, ...

  // build root component with basic services, variables and methods ... ?
  // review startsite.ts (see sign-up.ts) ...

  // rename password to passwordControl and so on ...
  // do the same for signals ...
  // rename InputValidation to InputValidators ...
  // remove matchword validator ... ?

  // destroy subscriptions ...
  // move form tag for other components (form, inputs, buttons) ...

  // update input validator and input validation!!
  // error text with end dots!

  // check font-family for inputs and buttons ... !
  // mixin for button hover, active and disabled ...

  form!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  passwordConfirmed: boolean = false;

  changedPassword = signal('');
  changedConfirmPassword = signal('');
  isPasswordConfirmed = computed(() => this.isPasswordMatch());

  // check!!!
  preEmail: string = '';
  message: string = '';

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

  // use variables!!!
  onRegister() {
    const payload = {
      username: 'kirbyDreamland',
      email: 'dreamland@mail.com',
      password: 'Test123!',
      repeated_password: 'Test123!',
    };

    // const payload = {
    //   username: 'luigiSpukhaus',
    //   email: 'spukhaus@mail.com',
    //   password: 'Test123!',
    //   repeated_password: 'Test123!',
    // };

    this.auth.registerUser(payload).subscribe({
      next: (response) => {
        console.log('Token:', response.token);
        console.log('User ID:', response.user_id);
        this.message = `Welcome, ${response.username}!`;

        // Optional: Save token in localStorage
        // localStorage.setItem('auth_token', response.token);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.message = 'Registration failed. Please try again.';
      },
    });
  }
}
