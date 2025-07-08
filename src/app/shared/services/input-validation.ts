import { Injectable } from '@angular/core';
import { InputValidator } from '../models/input-validator';
import { emailPatterns, passwordPatterns } from '../ts/patterns';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing an input validation service.
 */
export class InputValidation {
  validator = new InputValidator();

  required = [this.validator.required()];

  email = [
    this.validator.required(),
    this.validator.forbidden(emailPatterns.forbidden),
    this.validator.minLength(6),
    this.validator.email(emailPatterns.email),
    this.validator.maxLength(127),
  ];

  password = [
    this.validator.required(),
    this.validator.forbidden(passwordPatterns.forbidden),
    this.validator.minLength(8),
    this.validator.upperCase(passwordPatterns.upperCase),
    this.validator.lowerCase(passwordPatterns.lowerCase),
    this.validator.digit(passwordPatterns.digit),
    this.validator.specialChar(passwordPatterns.specialChar),
    this.validator.maxLength(127),
  ];

  /**
   * Get a validator function array for a matchword input.
   * @param password - The password to match.
   * @returns The validator function array for the matchword input.
   */
  getMatchword(password: string) {
    return [
      this.validator.required(),
      this.validator.forbidden(passwordPatterns.forbidden),
      this.validator.minLength(8),
      this.validator.upperCase(passwordPatterns.upperCase),
      this.validator.lowerCase(passwordPatterns.lowerCase),
      this.validator.digit(passwordPatterns.digit),
      this.validator.specialChar(passwordPatterns.specialChar),
      this.validator.matchword(password),
      this.validator.maxLength(127),
    ];
  }
}
