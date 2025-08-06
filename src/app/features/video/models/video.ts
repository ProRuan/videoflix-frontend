import { VideoData } from '../interfaces';

/**
 * Class representing a video.
 */
export class Video {
  readonly id: number;
  readonly title: string;
  readonly genre: string;
  readonly thumbnailImage: string;
  readonly spriteSheet: string;
  readonly createdAt: string;

  /**
   * Creates a video.
   * @param data - The video data.
   */
  constructor(data: VideoData) {
    this.id = data.id;
    this.title = data.title;
    this.genre = data.genre;
    this.thumbnailImage = data.thumbnail_image;
    this.spriteSheet = data.sprite_sheet;
    this.createdAt = data.created_at;
  }
}
