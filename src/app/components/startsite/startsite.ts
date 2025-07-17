import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { StartEmailInput } from '../../shared/components/start-email-input/start-email-input';
import { Footer } from '../../shared/components/footer/footer';
import { Videoflix } from '../../shared/services/videoflix';
import { InputValidation } from '../../shared/services/input-validation';
import { getFormControl } from '../../shared/ts/utils';

@Component({
  selector: 'app-startsite',
  imports: [ReactiveFormsModule, Header, StartEmailInput, Footer],
  templateUrl: './startsite.html',
  styleUrl: './startsite.scss',
})

/**
 * Class representing a startsite component.
 */
export class Startsite implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);

  readonly routerURL: string = '/';

  form!: FormGroup;
  email!: FormControl;

  /**
   * Initialize a startsite component.
   */
  ngOnInit(): void {
    this.setRouterURL();
    this.setForm();
  }

  /**
   * Set the current router URL.
   */
  private setRouterURL() {
    this.videoflix.setRouterURL(this.routerURL);
  }

  /**
   * Set a form group with an email control.
   */
  private setForm() {
    this.setEmailControl();
    this.setFormGroup();
  }

  /**
   * Set an email control with default value and validators.
   */
  private setEmailControl() {
    this.email = getFormControl('', this.validation.email);
  }

  /**
   * Set a form group with an email control.
   */
  private setFormGroup() {
    this.form = this.fb.group({
      email: this.email,
    });
  }

  /**
   * Reserve a validated email and redirect to the sign-up component.
   */
  onSignUp() {
    this.videoflix.cachedEmail = this.email?.value;
    this.router.navigateByUrl('sign-up');
  }

  /**
   * Check a form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid;
  }
}
