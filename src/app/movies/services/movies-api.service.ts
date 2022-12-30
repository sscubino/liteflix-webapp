import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, forkJoin, map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Movie, ResizableImage } from '../models/movie';
import { PaginatedResult } from '../models/paginated-result';
import { environment } from 'src/environments/environment';

export interface MovieResult {
  id: number;
  title: string;
  overview: string;
  original_title: string;
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

interface ApiConfiguration {
  images: {
    secure_base_url: string;
    backdrop_sizes: image_size[];
    poster_sizes: image_size[];
  };
}

@Injectable()
export class MoviesApiService {
  private readonly API_URL = environment.movies_api_base_url;
  private readonly API_KEY = environment.movies_api_key;
  private readonly CONFIG_COOKIE = 'MOVIES_API_CONFIG';
  private readonly CONFIG_COOKIE_TTL =
    environment.movies_api_configuration_cache_days_to_live;
  private readonly COMMON_REQ_OPTIONS = {
    params: { api_key: this.API_KEY },
  };
  private readonly configuration = new AsyncSubject<ApiConfiguration>();

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.loadApiConfiguration();
  }

  getFeaturedMovie(): Observable<Movie> {
    const requestObs = this.http.get<PaginatedResult<MovieResult>>(
      this.API_URL + '/movie/now_playing',
      this.COMMON_REQ_OPTIONS
    );
    return forkJoin([requestObs, this.configuration]).pipe(
      map(
        ([response, config]: [
          PaginatedResult<MovieResult>,
          ApiConfiguration
        ]) => {
          const random_idx = Math.floor(
            Math.random() * (response.results.length - 0.001)
          );
          const movie_result = response.results[random_idx];
          return this.resultToMovie(movie_result, config);
        }
      )
    );
  }

  getPopularMovies(): Observable<Movie[]> {
    const requestObs = this.http.get<PaginatedResult<MovieResult>>(
      this.API_URL + '/movie/popular',
      this.COMMON_REQ_OPTIONS
    );
    return forkJoin([requestObs, this.configuration]).pipe(
      map(
        ([response, config]: [
          PaginatedResult<MovieResult>,
          ApiConfiguration
        ]) => {
          return response.results.map((movie_result: MovieResult) =>
            this.resultToMovie(movie_result, config)
          );
        }
      )
    );
  }

  private loadApiConfiguration() {
    const cookie = this.cookies.get(this.CONFIG_COOKIE);
    if (cookie) {
      this.configuration.next(JSON.parse(cookie));
      this.configuration.complete();
    } else {
      this.getApiConfigurationFromApi().subscribe(config => {
        this.configuration.next(config);
        this.configuration.complete();
        this.cookies.set(
          this.CONFIG_COOKIE,
          JSON.stringify(config),
          this.CONFIG_COOKIE_TTL
        );
      });
    }
  }

  private getApiConfigurationFromApi(): Observable<ApiConfiguration> {
    return this.http.get<ApiConfiguration>(this.API_URL + '/configuration', {
      params: { api_key: this.API_KEY },
    });
  }

  private resultToMovie(
    movie_result: MovieResult,
    config: ApiConfiguration
  ): Movie {
    return new Movie(
      movie_result.original_title,
      new ResizableMovieBackdrop(movie_result.backdrop_path || '', config),
      movie_result.vote_average,
      new Date(movie_result.release_date)
    );
  }
}

class ResizableMovieBackdrop implements ResizableImage {
  original_url: string;

  constructor(private backdrop_path: string, private config: ApiConfiguration) {
    this.original_url = `${config.images.secure_base_url}original${backdrop_path}`;
  }

  url_for_width(imageWidth: number): string {
    if (!this.backdrop_path) return '';
    const imageSize = this.findImageSizeFor(
      imageWidth,
      this.config.images.backdrop_sizes
    );
    return `${this.config.images.secure_base_url}${imageSize}${this.backdrop_path}`;
  }

  private findImageSizeFor(imageWidth: number, available_sizes: image_size[]) {
    available_sizes = available_sizes.sort((a, b) => {
      if (a === 'original') return 1;
      if (b === 'original') return 0;
      return Number(a.slice(1)) - Number(b.slice(1));
    });
    const requiredImageWidth = imageWidth;
    return (
      available_sizes.find(
        available_size => Number(available_size.slice(1)) > requiredImageWidth
      ) || available_sizes.pop()
    );
  }
}
