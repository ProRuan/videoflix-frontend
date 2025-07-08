import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { Footer } from '../../shared/components/footer/footer';
import { Videoflix } from '../../shared/services/videoflix';
import { InputValidation } from '../../shared/services/input-validation';

@Component({
  selector: 'app-startsite',
  imports: [ReactiveFormsModule, Header, EmailInput, Footer],
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
  private inputValidation: InputValidation = inject(InputValidation);

  form!: FormGroup;
  email!: FormControl;

  /**
   * Initialize a startsite component.
   */
  ngOnInit(): void {
    this.videoflix.setRouterURL('/');
    this.setEmailControl();
    this.setForm();
  }

  /**
   * Set an email control with default value and validators.
   */
  setEmailControl() {
    this.email = new FormControl('', this.inputValidation.email);
  }

  /**
   * Set a form group with an email control.
   */
  setForm() {
    this.form = this.fb.group({
      email: this.email,
    });
  }

  /**
   * Reserve a validated email and redirect to the sign-up component.
   */
  onSignUp() {
    this.videoflix.preEmail = this.email?.getRawValue();
    this.router.navigateByUrl('sign-up');
  }
}
