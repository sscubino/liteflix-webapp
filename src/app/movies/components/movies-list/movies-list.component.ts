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

  constructor(private moviesApiService: MoviesApiService) {}

  ngOnInit(): void {
    this.moviesApiService.getPopularMovies().subscribe(popularMovies => {
      this.popularMoviesList = popularMovies.slice(0, 4);
      this.isLoadingPopularMovies = false;
      console.log(this.popularMoviesList);
    });
  }
}
