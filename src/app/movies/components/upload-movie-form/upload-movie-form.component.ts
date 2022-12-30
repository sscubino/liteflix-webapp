import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MyListApiService,
  ImageUploadResult,
} from '../../services/my-list-api.service';
import { UploadMovieModalComponent } from '../upload-movie-modal/upload-movie-modal.component';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-upload-movie-form',
  templateUrl: './upload-movie-form.component.html',
  styleUrls: ['./upload-movie-form.component.scss'],
})
export class UploadMovieFormComponent {
  @Output() movieSubmitted = new EventEmitter<Movie>();

  uploadMovieForm = new FormGroup({
    backdrop: new FormControl('', Validators.required),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(300),
    ]),
  });

  backdrop_file?: File;
  file_upload_status?: 'uploading' | 'success' | 'error';
  file_upload_progress?: number;

  formIsSubmitting = false;

  constructor(
    public dialogRef: MatDialogRef<UploadMovieModalComponent>,
    private myListApiService: MyListApiService
  ) {}

  handleFileDrop() {
    if (!this.backdrop_file) return;
    this.myListApiService.uploadImage(this.backdrop_file).subscribe(
      (event: HttpEvent<ImageUploadResult>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            this.file_upload_status = 'uploading';
            this.file_upload_progress = 0;
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.UploadProgress:
            if (!event.total || this.file_upload_status !== 'uploading') return;
            this.file_upload_progress = Math.round(
              (event.loaded / event.total) * 100
            );
            break;
          case HttpEventType.Response:
            this.file_upload_status = 'success';
            this.file_upload_progress = 100;
            this.uploadMovieForm.get('backdrop')?.setValue(event.body?.id);
        }
      },
      _error => {
        this.file_upload_status = 'error';
        this.file_upload_progress = 100;
      }
    );
  }

  handleUploadCancel() {
    this.backdrop_file = undefined;
    this.file_upload_status = undefined;
  }

  handleSendForm() {
    if (this.uploadMovieForm.invalid) return;
    this.formIsSubmitting = true;
    this.myListApiService
      .addMovieToMyList(this.uploadMovieForm.getRawValue())
      .subscribe(movie => {
        this.movieSubmitted.emit(movie);
        this.formIsSubmitting = false;
      });
  }
}
