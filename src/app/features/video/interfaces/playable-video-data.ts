import { AvailableResolutions } from './available-resolutions';
import { VideoData } from './video-data';

/**
 * Interface representing playable video data from the Videoflix API.
 * @extends VideoData
 */
export interface PlayableVideoData extends VideoData {
  description: string;
  video_file: string;
  hls_playlist: string;
  duration: number;
  available_resolutions: AvailableResolutions;
}
