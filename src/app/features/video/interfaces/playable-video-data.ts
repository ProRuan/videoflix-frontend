import { AvailableResolutions } from './available-resolutions';
import { VideoData } from './video-data';

/**
 * Interface representing playable video data from the Videoflix API.
 * @extends VideoData
 */
export interface PlayableVideoData extends VideoData {
  duration: number;
  hls_playlist: string;
  // interface for quality levels ... !
  quality_levels: {
    label: string;
    source: string;
  }[];
}
