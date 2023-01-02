import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ShareModule } from '../share/share.module';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesApiService } from './services/movies-api.service';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieTumbnailComponent } from './components/movie-tumbnail/movie-tumbnail.component';
import { UploadMovieModalComponent } from './components/upload-movie-modal/upload-movie-modal.component';
import { MyListApiService } from './services/my-list-api.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadMovieFormComponent } from './components/upload-movie-form/upload-movie-form.component';

@NgModule({
  declarations: [
    MoviesListComponent,
    MovieTumbnailComponent,
    UploadMovieModalComponent,
    UploadMovieFormComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [MoviesApiService, MyListApiService, CookieService],
  exports: [
    MoviesListComponent,
    UploadMovieModalComponent,
    UploadMovieFormComponent,
  ],
})
export class MoviesModule {}
