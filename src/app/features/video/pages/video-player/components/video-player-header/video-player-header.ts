import { Component, input } from '@angular/core';

import { BackButton } from '@shared/components/buttons';

/**
 * Class representing a video player header component.
 */
@Component({
  selector: 'app-video-player-header',
  imports: [BackButton],
  templateUrl: './video-player-header.html',
  styleUrl: './video-player-header.scss',
})
export class VideoPlayerHeader {
  percent = input(0);
}
