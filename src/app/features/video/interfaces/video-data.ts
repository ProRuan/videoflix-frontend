/**
 * Interface representing video data from the Videoflix API.
 */
export interface VideoData {
  id: number;
  title: string;
  genre: string;
  preview_clip: string;
  thumbnail_image: string;
  sprite_sheet: string;
  created_at: string;
}
