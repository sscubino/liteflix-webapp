import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-movie-page',
  templateUrl: './upload-movie.component.html',
  styleUrls: ['./upload-movie.component.scss'],
})
export class UploadMoviePageComponent {
  constructor(private router: Router) {}

  handleNavigateHome() {
    this.router.navigateByUrl('/');
  }
}
