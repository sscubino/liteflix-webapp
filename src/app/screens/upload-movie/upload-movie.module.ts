import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMovieComponent } from './upload-movie.component';
import { MoviesModule } from 'src/app/movies/movies.module';

@NgModule({
  declarations: [UploadMovieComponent],
  imports: [CommonModule, MoviesModule],
  exports: [UploadMovieComponent],
})
export class UploadMovieModule {}
