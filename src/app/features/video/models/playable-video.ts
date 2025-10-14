import { PlayableVideoData, QualityLevelData } from '../interfaces';

import { Video } from './video';

/**
 * Class representing a playable video.
 * @extends Video
 */
export class PlayableVideo extends Video {
  readonly duration: number;
  readonly hlsPlaylist: string;
  readonly qualityLevels: QualityLevelData[];

  /**
   * Creates a playable video.
   * @param data - The playable video data.
   */
  constructor(data: PlayableVideoData) {
    super(data);
    this.hlsPlaylist = data.hls_playlist;
    this.duration = data.duration;
    this.qualityLevels = data.quality_levels;
  }
}
