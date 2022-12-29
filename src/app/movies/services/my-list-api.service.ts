import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, MovieBackdrop } from '../models/movie';
import { PaginatedResult } from '../models/paginated-result';

export interface MovieResult {
  title: string;
  backdrop_path: string;
}

@Injectable()
export class MyListApiService {
  private readonly API_URL = environment.my_movies_list_api_base_url;

  constructor(private http: HttpClient) {}

  // addMovieToMyList(): Observable<Movie[]> {
  //   const requestObs = this.http.get<PaginatedResult<MyMovieResult>>(
  //     this.API_URL + '/movies'
  //   );
  //   return requestObs.pipe(
  //     map((response: PaginatedResult<MyMovieResult>) => {
  //       const my_list_result = response.results;
  //       // return my_list_result.map(result => new Movie())
  //       // return this.movieResultToMovie(movie_result, config);
  //     })
  //   );
  // }

  private resultToMovie(movie_result: MovieResult): Movie {
    return new Movie(
      movie_result.title,
      new BasicMovieBackdrop(movie_result.backdrop_path, this.API_URL)
    );
  }

  getMyList(): Observable<Movie[]> {
    const requestObs = this.http.get<PaginatedResult<MovieResult>>(
      this.API_URL + '/movies'
    );
    return requestObs.pipe(
      map((response: PaginatedResult<MovieResult>) =>
        response.results.map(result => this.resultToMovie(result))
      )
    );
  }
}

class BasicMovieBackdrop implements MovieBackdrop {
  public original_url: string;

  constructor(backdrop_path: string, base_path: string) {
    this.original_url = `${base_path}${backdrop_path}`;
  }

  url_for_width(_imageWidth: number): string {
    return this.original_url;
  }
}
