import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { StartEmailInput } from '../../shared/components/start-email-input/start-email-input';
import { Footer } from '../../shared/components/footer/footer';
import { Videoflix } from '../../shared/services/videoflix';
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
export class Startsite implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);

  form!: FormGroup;

  /**
   * Get the email control of a startsite form.
   * @returns The email control or null.
   */
  get email() {
    return this.form.get('email');
  }

  /**
   * Initialize a startsite component.
   */
  ngOnInit(): void {
    this.setForm();
  }

  /**
   * Set a startsite form.
   */
  private setForm() {
    this.form = this.fb.group({
      email: ['', this.validation.email],
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
