import { Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { InputBase } from './input-base';
import { FormControlErrors as ControlErrors } from '@shared/constants';

/**
 * Class representing an email input base directive.
 *
 * Provides common properties for email inputs.
 *
 * @extends InputBase
 */
@Directive()
export abstract class EmailInputBase extends InputBase {
  possibleErrorKeys: string[] = [
    ControlErrors.Required,
    ControlErrors.Forbidden,
    ControlErrors.MinLength,
    ControlErrors.Email,
    ControlErrors.MaxLength,
  ];

  @Input() placeholder: string = 'Email address';

  @ViewChild('email') input!: ElementRef<HTMLInputElement>;
}
