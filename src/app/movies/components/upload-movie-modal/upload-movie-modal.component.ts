import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Movie } from '../../models/movie';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-movie-modal',
  templateUrl: './upload-movie-modal.component.html',
  styleUrls: ['./upload-movie-modal.component.scss'],
})
export class UploadMovieModalComponent implements OnInit {
  movieSubmitted?: Movie;
  isMobileLayout = false;

  constructor(
    private breackpointObs: BreakpointObserver,
    private router: Router,
    public dialogRef: MatDialogRef<UploadMovieModalComponent>
  ) {}

  ngOnInit(): void {
    this.breackpointObs
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => (this.isMobileLayout = result.matches));
  }

  handleMovieSubmitted(movie: Movie) {
    this.movieSubmitted = movie;
  }

  close() {
    this.dialogRef.close();
  }
}
