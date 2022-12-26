import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesApiService } from './services/movies-api.service';
import { CookieService } from 'ngx-cookie-service';
import { MatButtonModule } from '@angular/material/button';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieTumbnailComponent } from './components/movie-tumbnail/movie-tumbnail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [MoviesListComponent, MovieTumbnailComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  providers: [MoviesApiService, CookieService],
  exports: [MoviesListComponent],
})
export class MoviesModule {}
