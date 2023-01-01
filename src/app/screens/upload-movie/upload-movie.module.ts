import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMoviePageComponent } from './upload-movie.component';
import { MoviesModule } from 'src/app/movies/movies.module';

@NgModule({
  declarations: [UploadMoviePageComponent],
  imports: [CommonModule, MoviesModule],
})
export class UploadMovieModule {}
