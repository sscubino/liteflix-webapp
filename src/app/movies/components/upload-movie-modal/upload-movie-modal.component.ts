import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-movie-modal',
  templateUrl: './upload-movie-modal.component.html',
  styleUrls: ['./upload-movie-modal.component.scss'],
})
export class UploadMovieModalComponent {
  uploadMovieForm = new FormGroup({
    movieBackdropFile: new FormControl(),
    movieName: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<UploadMovieModalComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
