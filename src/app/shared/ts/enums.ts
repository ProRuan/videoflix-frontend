export const enum Autocompletes {
  NewPassword = 'new-password',
  CurrentPassword = 'current-password',
}

// think about (local) enums ...
// check and rename enums ...

// set input maxLength ...

// review CommonModule and *ngIf ...
// comments: ValidatorFn that checks a control for ...

// check form validation module ...

export const enum DialogIds {
  Success = 'success-dialog',
  SignUpSuccess = 'sign-up-success-dialog',
  ForgotPasswordSuccess = 'forgot-password-success-dialog',
  ResetPasswordSuccess = 'reset-password-success-dialog',
}

export const enum InputErrors {
  Required = 'required',
  Forbidden = 'forbidden',
  MinLength = 'minLength',
  Email = 'email',
  UpperCase = 'uppercase',
  LowerCase = 'lowercase',
  Digit = 'digit',
  SpecialChar = 'specialChar',
  MaxLength = 'maxLength',
}

export const enum ToastIds {
  Error = 'error-toast',
}

export const enum Types {
  Text = 'text',
  Password = 'password',
}
