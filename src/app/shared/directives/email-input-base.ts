import { Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { InputBase } from './input-base';
import { InputErrors } from 'shared/ts/enums';

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
    InputErrors.Required,
    InputErrors.Forbidden,
    InputErrors.MinLength,
    InputErrors.Email,
    InputErrors.MaxLength,
  ];

  @Input() placeholder: string = 'Email address';

  @ViewChild('email') input!: ElementRef<HTMLInputElement>;
}
