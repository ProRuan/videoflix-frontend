/**
 * Interface representing video data from the Videoflix API.
 */
export interface VideoData {
  id: number;
  title: string;
  genre: string;
  description: string;
  preview: string;
  thumbnail: string;
  created_at: string;
}
