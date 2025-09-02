import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonVariants = 'secondary';

/**
 * Class representing a button component.
 */
@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() text: string = 'Action';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() reverse?: boolean;
  @Input() variant?: ButtonVariants;

  @Output('click') clickEvent = new EventEmitter<void>();

  /**
   * Get css classes of a button.
   * @returns The css classes of the button.
   */
  getClasses() {
    return {
      reverse: this.reverse,
      secondary: this.isVariant('secondary'),
    };
  }

  /**
   * Check for a button variant.
   * @param variant - The button variant to be checked.
   * @returns True if the variant is set, otherwise false.
   */
  isVariant(variant: ButtonVariants) {
    return this.variant === variant;
  }

  /**
   * Perform an action on click.
   */
  onAction() {
    this.clickEvent.emit();
  }

  /**
   * Get the source path of a button icon.
   * @returns The source path of the button icon.
   */
  getSrc() {
    return this.icon ? `images/buttons/${this.icon}.png` : '';
  }
}
