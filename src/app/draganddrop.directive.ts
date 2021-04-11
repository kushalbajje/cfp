import {
  Directive,
  Output,
  Input,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDraganddrop]',
})
export class DraganddropDirective {
  @HostBinding('class.fileover') fileOver: boolean | undefined;
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    console.log('dragover')
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    console.log('dragleave')
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
    console.log('drop')
  }
  constructor() {}
}
