import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';
import { Movie } from '../../models/movie';
import { MyListApiService } from '../../services/my-list-api.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  popularMoviesList: Movie[] = [];
  isLoadingPopularMovies = true;
  myMoviesList: Movie[] = [];
  isLoadingMyMovies = true;
  private isDisplaying: 'popular' | 'my-list' = 'popular';

  constructor(
    private moviesApiService: MoviesApiService,
    private myListService: MyListApiService
  ) {}

  ngOnInit(): void {
    this.moviesApiService.getPopularMovies().subscribe(popularMovies => {
      this.popularMoviesList = popularMovies.slice(0, 4);
      this.isLoadingPopularMovies = false;
    });
    this.myListService.getMyList().subscribe(myMoviesList => {
      this.myMoviesList = myMoviesList;
      this.isLoadingMyMovies = false;
    });
  }

  display(category: 'popular' | 'my-list'): void {
    this.isDisplaying = category;
  }

  isDisplayingPopular(): boolean {
    return this.isDisplaying === 'popular';
  }

  isDisplayingMyList(): boolean {
    return this.isDisplaying === 'my-list';
  }

  categoryDisplaying(): string {
    return this.isDisplayingPopular() ? 'POPULARES' : 'MIS PELICULAS';
  }
}
