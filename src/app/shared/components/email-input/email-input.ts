import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  forwardRef,
  InjectionToken,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-email-input',
  imports: [CommonModule],
  templateUrl: './email-input.html',
  styleUrl: './email-input.scss',
})
export class EmailInput implements ControlValueAccessor {
  error: string = '';
  possibleErrors: string[] = [
    'required',
    'forbidden',
    'minLength',
    'email',
    'maxLength',
  ];

  isError = signal(false);

  @Input() control!: AbstractControl<any, any> | null;

  @ViewChild('email') emailInput!: ElementRef<HTMLInputElement>;

  showError() {
    if (this.error) {
      this.isError.set(true);
    } else {
      this.isError.set(false);
    }
    // this.isError.update((isError) => !isError);
  }

  writeValue(): void {
    const value = this.emailInput.nativeElement.value;
    this.control?.setValue(value);
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  onInput() {
    this.writeValue();
    this.validateValue();
    this.showError();
  }

  validateValue() {
    this.updateInputError();
  }

  /**
   * Updates the input error of a control.
   */
  updateInputError() {
    this.error = '';
    for (const error of this.possibleErrors) {
      if (this.hasError(error)) {
        this.error = this.getError(error);
        break;
      }
    }
  }

  /**
   * Check a control for a specified error.
   * @param error - The error key to check.
   * @returns A boolean value.
   */
  hasError(error: string) {
    return !!this.control?.hasError(error);
  }

  /**
   * Get a specified error from the control.
   * @param error - The error key.
   * @returns The error value.
   */
  getError(error: string): string {
    return this.control?.getError(error);
  }
}

/**
 * Gets the provider of a dependency.
 * @param token - The injection token of the implement.
 * @param component - The component to refer.
 * @returns The provider of the dependency.
 */
export function getProvider<T>(token: InjectionToken<any>, component: T) {
  return {
    provide: token,
    useExisting: forwardRef(() => component),
    multi: true,
  };
}
