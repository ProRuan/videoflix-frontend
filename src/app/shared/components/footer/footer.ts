import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Videoflix } from '../../services/videoflix';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  host: {
    class: 'host',
    '[class.pos-absolute]': 'isVideoOffer()',
  },
})

/**
 * Class representing a footer component.
 */
export class Footer {
  private videoflix: Videoflix = inject(Videoflix);

  /**
   * Check the current component for being the video offer component.
   * @returns A boolean value.
   */
  isVideoOffer() {
    return this.videoflix.isVideoOffer();
  }
}
