export class Movie {
  constructor(
    public title: string,
    public backdrop: ResizableImage,
    public vote_average?: number,
    public release_date?: Date
  ) {}
}

export interface ResizableImage {
  url_for_width: (img_width: number) => string;
  original_url: string;
}
