export class Video {
  id: number = 0;
  title: string = '';
  genre: string = '';
  thumbnailImage: string = '';
  spriteSheet: string = '';
  createdAt: string = '';

  constructor(data?: any) {
    this.set(data);
  }

  set(data?: any) {
    this.id = data?.id;
    this.title = data?.title;
    this.genre = data?.genre;
    this.thumbnailImage = data?.thumbnail_image;
    this.spriteSheet = data?.sprite_sheet;
    this.createdAt = data?.created_at;
  }
}
