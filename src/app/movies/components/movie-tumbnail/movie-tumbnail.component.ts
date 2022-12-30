import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-tumbnail',
  templateUrl: './movie-tumbnail.component.html',
  styleUrls: ['./movie-tumbnail.component.scss'],
})
export class MovieTumbnailComponent {
  @Input()
  movie!: Movie;
  tumbnailContainerClass = '';
  focus = false;

  constructor() {}

  handleClick() {
    this.focus = !this.focus;
    this.tumbnailContainerClass = this.focus ? 'tumbnail-focus' : '';
  }
}
