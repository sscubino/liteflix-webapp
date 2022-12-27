import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output()
  openSidenav = new EventEmitter<void>();

  constructor() {}

  handleOpenSidenav() {
    this.openSidenav.emit();
  }
}
