import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, forkJoin, map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { image_size, Movie, MovieResult } from '../models/movie';
import { PaginatedResult } from '../models/paginated-result';
import { environment } from 'src/environments/environment';

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
          return this.movieResultToMovie(movie_result, config);
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
            this.movieResultToMovie(movie_result, config)
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

  private movieResultToMovie(
    movie_result: MovieResult,
    config: ApiConfiguration
  ): Movie {
    return new Movie(
      movie_result,
      config.images.secure_base_url,
      config.images.backdrop_sizes,
      config.images.poster_sizes
    );
  }
}
