import { Video } from './video';
import { AvailableResolutions, PlayableVideoData } from '../interfaces';

/**
 * Class representing a playable video.
 * @extends Video
 */
export class PlayableVideo extends Video {
  readonly duration: number;
  readonly hlsPlaylist: string;
  readonly qualityLevels: { label: string; source: string }[];
  // readonly availableResolutions: AvailableResolutions;

  /**
   * Creates a playable video.
   * @param data - The playable video data.
   */
  constructor(data: PlayableVideoData) {
    super(data);
    this.hlsPlaylist = data.hls_playlist;
    this.duration = data.duration;
    this.qualityLevels = data.quality_levels;
    // this.availableResolutions = data.available_resolutions;
  }
}
