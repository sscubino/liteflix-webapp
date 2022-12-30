import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-upload-movie-modal',
  templateUrl: './upload-movie-modal.component.html',
  styleUrls: ['./upload-movie-modal.component.scss'],
})
export class UploadMovieModalComponent {
  movieSubmitted?: Movie;

  constructor(public dialogRef: MatDialogRef<UploadMovieModalComponent>) {}

  handleMovieSubmitted(movie: Movie) {
    this.movieSubmitted = movie;
  }

  close() {
    this.dialogRef.close();
  }
}
