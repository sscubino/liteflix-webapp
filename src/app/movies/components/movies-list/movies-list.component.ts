import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';
import { Movie } from '../../models/movie';
import { MyListApiService } from '../../services/my-list-api.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  isMobileLayout = false;
  private isDisplaying: 'popular' | 'my-list' = 'popular';

  constructor(
    private moviesApiService: MoviesApiService,
    private myListService: MyListApiService,
    private breackpointObs: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.fetchPopularMovies();
    this.fetchMyMoviesList();
    this.myListService.newMovieUploadedEvent.subscribe(() => {
      this.isLoadingMyMovies = true;
      this.fetchMyMoviesList();
    });
    this.breackpointObs
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => (this.isMobileLayout = result.matches));
  }

  private fetchMyMoviesList() {
    this.myListService.getMyList().subscribe(myMoviesList => {
      this.myMoviesList = myMoviesList.slice(0, 2);
      this.isLoadingMyMovies = false;
    });
  }

  private fetchPopularMovies() {
    this.moviesApiService.getPopularMovies().subscribe(popularMovies => {
      this.popularMoviesList = popularMovies.slice(0, 4);
      this.isLoadingPopularMovies = false;
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
