import { Directive, ElementRef, signal } from '@angular/core';

/**
 * Abstract class representing a slider base directive.
 */
@Directive()
export abstract class SliderBase {
  pointerId = signal<number | null>(null);

  abstract onSlidding: (event: PointerEvent) => void;

  /**
   * Get a volume ratio.
   * @param clientX - The pointer client x.
   * @param rect - The volume bar as rectangle.
   * @returns The volume ratio.
   */
  protected getRatio(clientX: number, rect: DOMRect) {
    const deltaX = clientX - rect.left;
    const ratio = rect.width > 0 ? deltaX / rect.width : 0;
    return Math.max(0, Math.min(1, ratio));
  }

  /**
   * Set the pointer move event listener.
   * @param elementRef - The element reference.
   * @param fn - The function to be set.
   */
  protected setPointerMoveEvent(
    elementRef: ElementRef<HTMLDivElement>,
    fn: ((event: PointerEvent) => void) | null
  ) {
    elementRef.nativeElement.onpointermove = fn;
  }

  /**
   * Set the pointer capture.
   * @param event - The pointer event.
   */
  protected setPointerCapture(event: PointerEvent) {
    const pointer = event.target as Element;
    pointer.setPointerCapture(event.pointerId);
  }

  /**
   * Check if a pointer id matches the active pointer id.
   * @param id - The pointer id.
   * @returns True if the pointer id matches the active pointer id,
   *          otherwise false.
   */
  protected isPointerId(id: number) {
    return this.pointerId() === id;
  }

  /**
   * Release the pointer capture.
   * @param elementRef - The element reference.
   * @param id - The pointer id.
   */
  protected releasePointerCapture(
    elementRef: ElementRef<HTMLDivElement>,
    id: number
  ) {
    const bar = elementRef.nativeElement;
    if (bar.hasPointerCapture(id)) {
      bar.releasePointerCapture(id);
    }
  }
}
