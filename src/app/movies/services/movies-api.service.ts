import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, forkJoin, map, Observable } from 'rxjs';
import { image_size, Movie, MovieResult } from '../models/movie';
import { PaginatedResult } from '../models/paginated-result';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';



interface ApiConfiguration {
  images: {
    secure_base_url: string
    backdrop_sizes: image_size[]
    poster_sizes: image_size[]
  }
}

@Injectable()
export class MoviesApiService {
  API_URL = environment.movies_api_base_url;
  API_KEY = environment.movies_api_key;
  CONFIG_COOKIE = "MOVIES_API_CONFIG";
  CONFIG_COOKIE_TTL = environment.movies_api_configuration_cache_days_to_live;
  private configuration = new AsyncSubject<ApiConfiguration>();

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.loadApiConfiguration();
  }

  getFeaturedMovie(): Observable<Movie> {
    const requestObs = this.http.get<PaginatedResult<MovieResult>>(this.API_URL+'/movie/now_playing', { params: { 'api_key': this.API_KEY }});
    const apiConfigObs = this.configuration;
    return forkJoin([requestObs, apiConfigObs]).pipe(
      map(([response, config]: [PaginatedResult<MovieResult>, ApiConfiguration]) => {
        return new Movie(response.results[2], config.images.secure_base_url, config.images.backdrop_sizes, config.images.poster_sizes);
      })
    );
  }

  private loadApiConfiguration() {
    const cookie = this.cookies.get(this.CONFIG_COOKIE);
    if (cookie) {
      this.configuration.next(JSON.parse(cookie));
      this.configuration.complete();
    } else {
      this.getApiConfigurationFromApi()
        .subscribe(config => {
          this.configuration.next(config);
          this.configuration.complete();
          this.cookies.set(this.CONFIG_COOKIE, JSON.stringify(config), this.CONFIG_COOKIE_TTL);
        });
    }
  }

  private getApiConfigurationFromApi(): Observable<ApiConfiguration> {
    return this.http.get<ApiConfiguration>(this.API_URL+'/configuration', { params: { 'api_key': this.API_KEY }});
  }
}
