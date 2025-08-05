import { Component } from '@angular/core';
import { EmailInputBase } from '../../../directives/inputs';

/**
 * Class representing an email input component for the startsite.
 * @extends EmailInputBase
 */
@Component({
  selector: 'app-start-email-input',
  imports: [],
  templateUrl: './start-email-input.html',
  styleUrl: './start-email-input.scss',
})
export class StartEmailInput extends EmailInputBase {}
