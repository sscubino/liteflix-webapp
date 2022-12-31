import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/movies/models/movie';
import { MoviesApiService } from 'src/app/movies/services/movies-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featuredMovie?: Movie;
  featuredMovieBackdropURL?: string;
  isMobileLayout = false;

  constructor(
    private moviesService: MoviesApiService,
    private breackpointObs: BreakpointObserver
  ) {}

  ngOnInit() {
    this.moviesService.getFeaturedMovie().subscribe(movie => {
      this.featuredMovie = movie;
      this.featuredMovieBackdropURL = movie.backdrop.original_url;
    });
    this.breackpointObs
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => (this.isMobileLayout = result.matches));
  }
}
