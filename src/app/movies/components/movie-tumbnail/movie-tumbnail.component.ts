import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

const LG_IMG_WIDTH = 540;
const SM_IMG_WIDTH = 220;

@Component({
  selector: 'app-movie-tumbnail',
  templateUrl: './movie-tumbnail.component.html',
  styleUrls: ['./movie-tumbnail.component.scss'],
})
export class MovieTumbnailComponent implements OnInit {
  @Input() movie!: Movie;
  backdropURL?: string;

  isMobileLayout = false;
  focus = false;

  constructor(private breackpointObs: BreakpointObserver) {}

  ngOnInit(): void {
    this.breackpointObs
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isMobileLayout = result.matches;
        const backdropSize = result.matches ? LG_IMG_WIDTH : SM_IMG_WIDTH;
        this.backdropURL = this.movie.backdrop.url_for_width(backdropSize);
      });
  }

  handleClick() {
    this.focus = !this.focus;
  }
}
