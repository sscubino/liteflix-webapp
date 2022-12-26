import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
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
}
