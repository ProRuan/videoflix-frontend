import { Component } from '@angular/core';
import { EmailInputBase } from '../../directives/email-input-base';

@Component({
  selector: 'app-start-email-input',
  imports: [],
  templateUrl: './start-email-input.html',
  styleUrl: './start-email-input.scss',
})

/**
 * Class representing an email input component for the startsite.
 * @extends EmailInputBase
 */
export class StartEmailInput extends EmailInputBase {}
