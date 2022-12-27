import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { DragAndDropFileInputComponent } from './components/drag-and-drop-file-input/drag-and-drop-file-input.component';
import { FileDropDirective } from './directives/file-drop.directive';

@NgModule({
  declarations: [
    ToolbarComponent,
    DragAndDropFileInputComponent,
    FileDropDirective,
  ],
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule],
  exports: [ToolbarComponent, DragAndDropFileInputComponent],
})
export class ShareModule {}
