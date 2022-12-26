export interface MovieResult {
  id: number;
  title: string;
  overview: string;
  original_title: String;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  release_date: string;
  original_language: string;
  genre_ids: number[];
  video: boolean;
  adult: boolean;
}

export type image_size = `w${number}` | 'original';

export class Movie {
  public title: string;
  public overview: string;
  public vote_average: number;

  private backdrop_path: string | null;
  private poster_path: string | null;
  private images_base_url: string;
  private available_poster_sizes: image_size[];
  private available_backdrop_sizes: image_size[];

  constructor(
    movie_result: MovieResult,
    images_base_url: string,
    available_poster_sizes: image_size[],
    available_backdrop_sizes: image_size[]
  ) {
    this.title = movie_result.title;
    this.overview = movie_result.overview;
    this.vote_average = movie_result.vote_average;
    this.backdrop_path = movie_result.backdrop_path;
    this.poster_path = movie_result.poster_path;
    this.images_base_url = images_base_url;
    this.available_poster_sizes = available_poster_sizes;
    this.available_backdrop_sizes = available_backdrop_sizes;
  }

  originalBackdropURL(): string {
    return `${this.images_base_url}original${this.backdrop_path}`;
  }

  backdropURLForWidth(imageWidth: number, imageHeigth: number): string {
    if (!this.backdrop_path) return '';
    const imageSize = this.findImageSizeFor(
      imageWidth,
      imageHeigth,
      this.available_backdrop_sizes
    );
    return `${this.images_base_url}${imageSize}${this.backdrop_path}`;
  }

  posterURLForWidth(imageWidth: number, imageHeigth: number): string {
    if (!this.poster_path) return '';
    const imageSize = this.findImageSizeFor(
      imageWidth,
      imageHeigth,
      this.available_poster_sizes
    );
    return `${this.images_base_url}${imageSize}${this.poster_path}`;
  }

  private findImageSizeFor(
    imageWidth: number,
    imageHeigth: number,
    available_sizes: image_size[]
  ) {
    const GR = 1.62;
    available_sizes = available_sizes.sort((a, b) => {
      if (a === 'original') return 1;
      if (b === 'original') return 0;
      return Number(a.slice(1)) - Number(b.slice(1));
    });
    const requiredImageWidth = Math.max(imageWidth, imageHeigth * GR);
    return (
      available_sizes.find(
        available_size => Number(available_size.slice(1)) > requiredImageWidth
      ) || available_sizes.pop()
    );
  }
}
