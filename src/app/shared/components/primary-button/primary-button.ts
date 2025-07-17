import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
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

  @Output('click') clickEvent = new EventEmitter<void>();

  /**
   * Perform an action on click.
   */
  onAction() {
    this.clickEvent.emit();
  }
}
