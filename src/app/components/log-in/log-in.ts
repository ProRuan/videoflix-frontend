import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { ErrorToast } from '../../shared/components/error-toast/error-toast';
import { Videoflix } from '../../shared/services/videoflix';
import { InputValidation } from '../../shared/services/input-validation';
import { Authentication } from '../../shared/services/authentication';
import { LogInPayload } from '../../shared/interfaces/log-in-payload';
import {
  animateOnLeave,
  getFormControl,
  hideElement,
} from '../../shared/ts/utils';

@Component({
  selector: 'app-log-in',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    Header,
    EmailInput,
    PasswordInput,
    PrimaryButton,
    Footer,
    ErrorToast,
  ],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})

/**
 * Class representing a log-in component.
 * @implements {OnInit}
 */
export class LogIn implements OnInit {
  private elementRef: ElementRef = inject(ElementRef);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);
  private auth: Authentication = inject(Authentication);

  private readonly routerUrl: string = 'log-in';

  form!: FormGroup;
  email!: FormControl;
  password!: FormControl;

  message: string = 'Please check your input and try again.';
  isToastOpened: WritableSignal<boolean> = signal(false);
  isSlideOutActive: WritableSignal<boolean> = signal(false);
  timeoutId!: ReturnType<typeof setTimeout>;

  /**
   * Initialize a log-in component.
   */
  ngOnInit(): void {
    this.setRouterURL();
    this.setForm();
  }

  /**
   * Set the current router URL.
   */
  private setRouterURL() {
    this.videoflix.setRouterURL(this.routerUrl);
  }

  /**
   * Set a log-in form.
   */
  private setForm() {
    this.setFormControls();
    this.setFormGroup();
  }

  /**
   * Set form controls for email and password.
   */
  private setFormControls() {
    this.email = getFormControl('', this.validation.email);
    this.password = getFormControl('', this.validation.password);
  }

  /**
   * Set a form group composed of email and password control.
   */
  private setFormGroup() {
    this.form = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }

  /**
   * Log in a user on submit.
   * If successful, the user is redirected to the video offer component.
   * Otherwise, an error toast is shown.
   */
  onLogIn() {
    clearTimeout(this.timeoutId);
    const payload = this.getPayload();
    this.auth.logInUser(payload).subscribe({
      next: (response) => this.logInUser(response),
      error: () => this.openErrorToast(),
    });
  }

  /**
   * Get a log-in payload.
   * @returns The log-in payload.
   */
  private getPayload(): LogInPayload {
    return {
      email: this.email?.value,
      password: this.password?.value,
    };
  }

  /**
   * Log-in a user after setting the auth token.
   * @param response - The response of the API log-in endpoint.
   */
  private logInUser(response: any) {
    this.videoflix.setAuthData(response);
    this.router.navigateByUrl('video-offer');
  }

  /**
   * Open an error toast for four seconds.
   */
  private openErrorToast() {
    this.isToastOpened.set(true);
    this.timeoutId = setTimeout(() => this.slideOutToast(), 4000);
  }

  /**
   * Check a log-in form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid;
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
