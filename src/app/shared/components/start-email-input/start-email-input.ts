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
    InputErrors.Required,
    InputErrors.Forbidden,
    InputErrors.MinLength,
    InputErrors.Email,
    InputErrors.MaxLength,
  ];

  @Input() control!: AbstractControl | null;
  @Input() errorsVisible: boolean = true;

  @ViewChild('email') input!: ElementRef<HTMLInputElement>;
}
