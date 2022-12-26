import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesApiService } from './services/movies-api.service';
import { CookieService } from 'ngx-cookie-service';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  providers: [
    MoviesApiService,
    CookieService
  ],
  exports: []
})
export class MoviesModule { }
