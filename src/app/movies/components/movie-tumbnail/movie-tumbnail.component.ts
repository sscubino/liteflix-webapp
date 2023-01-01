import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-movie-tumbnail',
  templateUrl: './movie-tumbnail.component.html',
  styleUrls: ['./movie-tumbnail.component.scss'],
})
export class MovieTumbnailComponent {
  @Input()
  movie!: Movie;
  focus = false;
  isMobileLayout = false;

  constructor(private breackpointObs: BreakpointObserver) {}

  ngOnInit(): void {
    this.breackpointObs
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => (this.isMobileLayout = result.matches));
  }

  handleClick() {
    this.focus = !this.focus;
  }
}
