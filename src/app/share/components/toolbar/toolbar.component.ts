import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadMovieModalComponent } from 'src/app/movies/components/upload-movie-modal/upload-movie-modal.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output()
  openSidenav = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  handleOpenSidenav() {
    this.openSidenav.emit();
  }

  handleUploadNewMovie() {
    this.dialog.open(UploadMovieModalComponent, {
      width: '730px',
      autoFocus: false,
    });
  }
}
