import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Class representing a primary button component.
 */
@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.html',
  styleUrl: './primary-button.scss',
})
export class PrimaryButton {
  @Input() text: string = 'Action';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() reverse?: boolean;

  @Output('click') clickEvent = new EventEmitter<void>();

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
