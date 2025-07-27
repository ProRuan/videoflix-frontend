import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [CommonModule],
  templateUrl: './primary-button.html',
  styleUrl: './primary-button.scss',
})

/**
 * Class representing a primary button.
 */
export class PrimaryButton {
  @Input() text: string = 'Action';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() icon?: string;

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
