import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BaseInput } from '../../models/base-input';
import { InputErrors } from '../../ts/enums';

@Component({
  selector: 'app-start-email-input',
  imports: [],
  templateUrl: './start-email-input.html',
  styleUrl: './start-email-input.scss',
})

/**
 * Class representing an email input component for the startsite.
 */
export class StartEmailInput extends BaseInput {
  possibleErrors: string[] = [
    InputErrors.required,
    InputErrors.forbidden,
    InputErrors.minLength,
    InputErrors.email,
    InputErrors.maxLength,
  ];

  @Input() control!: AbstractControl | null;

  @ViewChild('email') input!: ElementRef<HTMLInputElement>;
}
