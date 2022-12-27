import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  public popularMoviesList: Movie[] = [];
  public isLoadingPopularMovies = true;
  public myMoviesList: Movie[] = [];
  public isLoadingMyMovies = true;
  private isDisplaying: 'popular' | 'my-list' = 'popular';

  constructor(private moviesApiService: MoviesApiService) {}

  ngOnInit(): void {
    this.moviesApiService.getPopularMovies().subscribe(popularMovies => {
      this.popularMoviesList = popularMovies.slice(0, 4);
      this.isLoadingPopularMovies = false;
    });
    this.moviesApiService.getPopularMovies().subscribe(myMoviesList => {
      this.myMoviesList = [];
      this.isLoadingMyMovies = false;
    });
  }

  public display(category: 'popular' | 'my-list'): void {
    this.isDisplaying = category;
  }

  public isDisplayingPopular(): boolean {
    return this.isDisplaying === 'popular';
  }

  public isDisplayingMyList(): boolean {
    return this.isDisplaying === 'my-list';
  }

  public categoryDisplaying(): string {
    return this.isDisplayingPopular() ? 'POPULAR' : 'MI LISTA';
  }
}
