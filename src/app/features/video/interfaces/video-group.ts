import { Video } from '../models';

/**
 * Interface representing a video group.
 */
export interface VideoGroup {
  genre: string;
  videos: Video[];
}
