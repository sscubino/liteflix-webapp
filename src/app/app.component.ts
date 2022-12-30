import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadMovieModalComponent } from './movies/components/upload-movie-modal/upload-movie-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav) sidenavRef!: MatSidenav;

  navigationButtons = [
    { label: 'INICIO', action: () => null },
    { label: 'SERIES', action: () => null },
    { label: 'PELÍCULAS', action: () => null },
    { label: 'AGREGADAS RECIENTEMENTE', action: () => null },
    { label: 'POPULARES', action: () => null },
    { label: 'MIS PELÍCULAS', action: () => null },
    { label: 'MI LISTA', action: () => null },
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    this.registerIcons();
  }

  private registerIcons() {
    const ICON_NAMES = [
      'play',
      'play-button',
      'play-button-on',
      'plus',
      'arrow',
      'tick',
      'menu',
      'notifications',
      'clip',
    ];
    ICON_NAMES.forEach(iconName => {
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `../assets/icons/${iconName}.svg`
        )
      );
    });
  }

  handleAddMovieAction() {
    this.sidenavRef.close();
    this.dialog.open(UploadMovieModalComponent, {
      width: '730px',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
