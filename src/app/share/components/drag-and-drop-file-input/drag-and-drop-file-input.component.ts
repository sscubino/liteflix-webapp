import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-drag-and-drop-file-input',
  templateUrl: './drag-and-drop-file-input.component.html',
  styleUrls: ['./drag-and-drop-file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DragAndDropFileInputComponent,
    },
  ],
})
export class DragAndDropFileInputComponent implements ControlValueAccessor {
  value?: File;

  onChange = (_file: File) => null;
  onTouched = () => null;

  constructor() {}

  fileBrowserHangler(event: Event) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    if (!input.files) return;
    if (input.files.length > 1) return;
    this.value = input.files[0];
    this.onChange(this.value);
  }

  onFileDropped(files: FileList) {
    this.value = files[0];
    this.onChange(this.value);
  }

  writeValue(file: File) {
    this.value = file;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}
