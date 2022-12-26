import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MoviesModule } from 'src/app/movies/movies.module';
import { MoviesApiService } from 'src/app/movies/services/movies-api.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatSidenavModule, MatButtonModule, MoviesModule],
  providers: [MoviesApiService],
})
export class HomeModule {}