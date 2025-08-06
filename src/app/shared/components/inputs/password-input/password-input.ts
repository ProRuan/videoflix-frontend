import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PasswordInputBase } from '@shared/directives';

/**
 * Class representing a password input component.
 * @extends InputBase
 */
@Component({
  selector: 'app-password-input',
  imports: [CommonModule],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
})
export class PasswordInput extends PasswordInputBase {}
