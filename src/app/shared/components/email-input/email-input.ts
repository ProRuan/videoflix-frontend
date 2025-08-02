import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BaseInput } from '../../models/base-input';
import { InputErrors } from '../../ts/enums';

@Component({
  selector: 'app-email-input',
  imports: [],
  templateUrl: './email-input.html',
  styleUrl: './email-input.scss',
})

/**
 * Class representing an email input component.
 * @extends BaseInput
 */
export class EmailInput extends BaseInput {
  possibleErrors: string[] = [
    InputErrors.Required,
    InputErrors.Forbidden,
    InputErrors.MinLength,
    InputErrors.Email,
    InputErrors.MaxLength,
  ];

  @Input() control!: AbstractControl | null;
  @Input() placeholder: string = 'Email address';
  @Input() errorsVisible: boolean = true;

  @ViewChild('email') input!: ElementRef<HTMLInputElement>;
}
