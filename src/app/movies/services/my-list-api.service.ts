import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, ResizableImage } from '../models/movie';
import { PaginatedResult } from '../models/paginated-result';

export interface MovieResult {
  title: string;
  backdrop_path: string;
}

export interface ImageUploadResult {
  id: string;
  file: string;
}

@Injectable()
export class MyListApiService {
  private readonly API_URL = environment.my_movies_list_api_base_url;
  public readonly newMovieUploadedEvent = new Subject<void>();

  constructor(private http: HttpClient) {}

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

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ImageUploadResult>(
      this.API_URL + '/movies/images/',
      formData,
      { reportProgress: true, observe: 'events' }
    );
  }

  addMovieToMyList(movieForm: {
    title: string;
    backdrop: string;
  }): Observable<Movie> {
    return this.http
      .post<MovieResult>(this.API_URL + '/movies/', movieForm)
      .pipe(
        map(result => {
          this.newMovieUploadedEvent.next();
          return this.resultToMovie(result);
        })
      );
  }

  private resultToMovie(movie_result: MovieResult): Movie {
    return new Movie(
      movie_result.title,
      new BasicMovieBackdrop(movie_result.backdrop_path, this.API_URL)
    );
  }
}

class BasicMovieBackdrop implements ResizableImage {
  original_url: string;

  constructor(backdrop_path: string, base_path: string) {
    this.original_url = `${base_path}${backdrop_path}`;
  }

  url_for_width(_imageWidth: number): string {
    return this.original_url;
  }
}
