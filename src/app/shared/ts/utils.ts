import { ElementRef, WritableSignal } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

/**
 * Animate an element which is leaving the HTML DOM.
 * @param elementRef - The element reference.
 * @param selector - The selector of the element to be animated.
 * @param onComplete - The function to be called at the end of the transition.
 */
export function animateOnLeave(
  elementRef: ElementRef,
  selector: string,
  onComplete: () => void
) {
  const target = elementRef.nativeElement.querySelector(selector);
  target.addEventListener('transitionend', () => onComplete());
}

/**
 * Get a form control.
 * @param value - The default value to set.
 * @param validators - The validators to set.
 * @returns The form control.
 */
export function getFormControl(value: string, validators: ValidatorFn[]) {
  return new FormControl(value, validators);
}

/**
 * Hide an element by removing it from the HTML DOM:
 * @param isElementShown - The signal that controls the display state of the element.
 * @param isAnimationActive - The signal that controls the animation state of the element.
 */
export function hideElement(
  isElementShown: WritableSignal<boolean>,
  isAnimationActive: WritableSignal<boolean>
) {
  isElementShown.set(false);
  isAnimationActive.set(false);
}
