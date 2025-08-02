import { Component } from '@angular/core';
import { EmailInputBase } from '../../directives/email-input-base';

@Component({
  selector: 'app-email-input',
  imports: [],
  templateUrl: './email-input.html',
  styleUrl: './email-input.scss',
})

/**
 * Class representing an email input component.
 * @extends EmailInputBase
 */
export class EmailInput extends EmailInputBase {}
