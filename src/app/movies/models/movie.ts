export class Movie {
  constructor(
    public title: string,
    public backdrop: MovieBackdrop,
    public vote_average?: number,
    public release_date?: Date
  ) {}
}

export interface MovieBackdrop {
  url_for_width: (img_width: number) => string;
  original_url: string;
}
