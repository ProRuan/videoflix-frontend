import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/models/base-component';
import { Header } from '../../shared/components/header/header';
import { StartEmailInput } from '../../shared/components/start-email-input/start-email-input';
import { Footer } from '../../shared/components/footer/footer';
import { InputValidation } from '../../shared/services/input-validation';

@Component({
  selector: 'app-startsite',
  imports: [ReactiveFormsModule, Header, StartEmailInput, Footer],
  templateUrl: './startsite.html',
  styleUrl: './startsite.scss',
})

/**
 * Class representing a startsite component.
 */
export class Startsite extends BaseComponent implements OnInit {
  private router: Router = inject(Router);
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
    this.email = this.getFormControl('', this.validation.email);
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
