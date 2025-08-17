import { Video } from './video';
import { AvailableResolutions, PlayableVideoData } from '../interfaces';

/**
 * Class representing a playable video.
 * @extends Video
 */
export class PlayableVideo extends Video {
  readonly description: string;
  readonly videoFile: string;
  readonly hlsPlaylist: string;
  readonly duration: number;
  readonly availableResolutions: AvailableResolutions;

  /**
   * Creates a playable video.
   * @param data - The playable video data.
   */
  constructor(data: PlayableVideoData) {
    super(data);
    this.description = data.description;
    this.videoFile = data.video_file;
    this.hlsPlaylist = data.hls_playlist;
    this.duration = data.duration;
    this.availableResolutions = data.available_resolutions;
  }
}
