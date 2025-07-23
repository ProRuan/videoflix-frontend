import { Video } from './video';

export class PlayableVideo extends Video {
  description: string = '';
  videoFile: string = '';
  hlsPlaylist: string = '';
  previewClip: string = '';
  duration: number = 0;
  availableResolutions: string[] = [];

  constructor(data?: any) {
    super();
    this.set(data);
  }

  override set(data?: any) {
    this.id = data?.id;
    this.title = data?.title;
    this.genre = data?.genre;
    this.description = data?.description;
    this.videoFile = data?.video_file;
    this.hlsPlaylist = data?.hls_playlist;
    this.previewClip = data?.preview_clip;
    this.thumbnailImage = data?.thumbnail_image;
    this.spriteSheet = data?.sprite_sheet;
    this.duration = data?.duration;
    this.availableResolutions = data?.available_resolutions;
    this.createdAt = data?.created_at;
  }
}
