import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output()
  openSidenav = new EventEmitter<void>();

  @Output()
  openAddMovie = new EventEmitter<void>();

  isMobileLayout = false;

  constructor(private breackpointObs: BreakpointObserver) {}

  ngOnInit() {
    this.breackpointObs
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => (this.isMobileLayout = result.matches));
  }

  handleOpenSidenav() {
    this.openSidenav.emit();
  }

  handleUploadNewMovie() {
    this.openAddMovie.emit();
  }
}
