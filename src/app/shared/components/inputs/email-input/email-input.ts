import { Component } from '@angular/core';
import { EmailInputBase } from '../../../directives';

/**
 * Class representing an email input component.
 * @extends EmailInputBase
 */
@Component({
  selector: 'app-email-input',
  imports: [],
  templateUrl: './email-input.html',
  styleUrl: './email-input.scss',
})
export class EmailInput extends EmailInputBase {}
