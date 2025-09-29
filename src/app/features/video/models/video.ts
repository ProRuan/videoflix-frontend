import { VideoData } from '../interfaces';

/**
 * Class representing a video.
 */
export class Video {
  readonly id: number;
  readonly title: string;
  readonly genre: string;
  readonly description: string;
  // rename
  readonly previewClip: string;
  // rename
  readonly thumbnailImage: string;
  readonly createdAt: string;

  /**
   * Creates a video.
   * @param data - The video data.
   */
  constructor(data: VideoData) {
    this.id = data.id;
    this.title = data.title;
    this.genre = data.genre;
    this.description = data.description;
    this.previewClip = data.preview;
    this.thumbnailImage = data.thumbnail;
    this.createdAt = data.created_at;
  }
}
