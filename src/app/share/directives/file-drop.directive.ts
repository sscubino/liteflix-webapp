import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appFileDrop]',
})
export class FileDropDirective {
  @HostBinding('class.fileover') fileOver = false;
  @Output() fileDropped = new EventEmitter<FileList>();

  constructor() {}

  @HostListener('dragover', ['$event']) onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
    console.log('Drag Over');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    console.log('Drag Leave');
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.fileDropped.emit(files);
      console.log('Drop: ', files);
    }
  }
}
