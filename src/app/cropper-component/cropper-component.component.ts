import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StyleRenderer, lyl } from '@alyle/ui';
import {
  ImgCropperConfig,
  ImgCropperEvent,
  LyImageCropper,
  ImgCropperErrorEvent,
  ImgCropperLoaderConfig,
} from '@alyle/ui/image-cropper';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';

const STYLES = () => ({
  cropper: lyl`{
    max-width: 400px
    height: 250px
  }`,
  sliderContainer: lyl`{
    text-align: center
    max-width: 400px
    margin: 14px
  }`,
});
@Component({
  selector: 'app-cropper-component',
  templateUrl: './cropper-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [StyleRenderer],
})
export class CropperComponentComponent {
  constructor(
    readonly sRenderer: StyleRenderer,
    public dialogRef: MatDialogRef<CropperComponentComponent>,
    public cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  

  classes = this.sRenderer.renderSheet(STYLES);
  croppedImage: any;
  scale: any;
  ready: any;
  minScale: any;
  @ViewChild(LyImageCropper) cropper!: LyImageCropper;

  myConfig: ImgCropperConfig = {
    // autoCrop: true,
    width: 250, // Default `250`
    height: 250, // Default `200`
    fill: '#fafafa', // Default transparent if type = png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
    responsiveArea: true,
    round: true,
  };

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    // console.log('cropped img: ', e);
  }
  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
  }
  onError(e: ImgCropperErrorEvent) {
    // console.warn(`'${e.name}' is not a valid image`, e);
  }

  upload() {
    this.dialogRef.close(this.croppedImage);
  }

  close() {
    this.dialogRef.close();
  }
}
