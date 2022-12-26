import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/movies/models/movie';
import { MoviesApiService } from 'src/app/movies/services/movies-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public featuredMovie?: Movie;
  public featuredMovieBackdropURL?: string;

  constructor(private moviesService: MoviesApiService) { }

  ngOnInit() {
    this.moviesService.getFeaturedMovie().subscribe(movie => {
      this.featuredMovie = movie;
      this.featuredMovieBackdropURL = movie.originalBackdropURL();
    });
  }
}
