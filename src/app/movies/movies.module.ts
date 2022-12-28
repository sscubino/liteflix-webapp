import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ShareModule } from '../share/share.module';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { MoviesApiService } from './services/movies-api.service';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieTumbnailComponent } from './components/movie-tumbnail/movie-tumbnail.component';
import { UploadMovieModalComponent } from './components/upload-movie-modal/upload-movie-modal.component';

@NgModule({
  declarations: [
    MoviesListComponent,
    MovieTumbnailComponent,
    UploadMovieModalComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    ShareModule,
    ReactiveFormsModule,
  ],
  providers: [MoviesApiService, CookieService],
  exports: [MoviesListComponent, UploadMovieModalComponent],
})
export class MoviesModule {}
