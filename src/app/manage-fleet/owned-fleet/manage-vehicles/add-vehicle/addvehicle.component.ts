import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CropperComponentComponent } from '../../../../cropper-component/cropper-component.component';

@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.css'],
})
export class AddvehicleComponent implements OnInit {
  registrationCertificateFiles: File[] = [];
  insuranceFiles: File[] = [];
  emissionTestFiles: File[] = [];
  roadTaxFiles: File[] = [];
  fitnessCertificateFiles: File[] = [];
  vehiclePhotoFiles: File[] = [];
  vehicleDetails: any = [];
  vehicleData: string[] = [];
  branches: string[] = ['Bangalore', 'Mysore', 'Dharwad'];
  drivers: string[] = ['Driver 1', 'Driver 2', 'Driver 3'];
  days = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];
  banks: string[] = [
    'State Bank of India',
    'Canara Bank',
    'HDFC Bank',
    'Axis Bank',
  ];
  fuelType: string[] = ['Petrol', 'Diesel', 'CNG', 'Electric'];

  files: File[] = [];

  toggleButton: boolean = true;
  isDisabled: boolean = true;
  imageData: any = [];
  toggleReuploadDocuments: boolean = false;
  vehicledata: [] = [];

  /**ng-model binding variables */
  vehicleNumber!: string;
  vehicleModel!: string;
  vehicleColor!: string;
  vehicleName!: string;
  vehicleMake!: string;
  vehicleSeatingCapacity!: string;
  vehicleChassisNumber!: string;
  vehicleEngineNumber!: string;
  // fuel!: string;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  onSelect(event: { addedFiles: any }, doc: string) {
    // console.log(event.addedFiles);
    let imageDocument: {} | any = {};
    if (doc === 'Registration certificate') {
      if (this.registrationCertificateFiles.length < 1) {
        this.registrationCertificateFiles.push(...event.addedFiles);
      }
      console.log(this.registrationCertificateFiles);
    } else if (doc === 'Insurance') {
      if (this.insuranceFiles.length < 1) {
        this.insuranceFiles.push(...event.addedFiles);
      }
    } else if (doc === 'Emission test') {
      if (this.emissionTestFiles.length < 1) {
        this.emissionTestFiles.push(...event.addedFiles);
      }
    } else if (doc === 'Road tax') {
      if (this.roadTaxFiles.length < 1) {
        this.roadTaxFiles.push(...event.addedFiles);
      }
    } else if (doc === 'Fitness certificate') {
      if (this.fitnessCertificateFiles.length < 1) {
        this.fitnessCertificateFiles.push(...event.addedFiles);
      }
    } else {
      if (this.vehiclePhotoFiles.length < 1) {
        this.vehiclePhotoFiles.push(...event.addedFiles);
      }
    }
  }

  onRemove(event: File, doc: string) {
    if (doc === 'Registration certificate') {
      this.registrationCertificateFiles.splice(
        this.registrationCertificateFiles.indexOf(event),
        1
      );
    } else if (doc === 'Insurance') {
      this.insuranceFiles.splice(this.insuranceFiles.indexOf(event), 1);
    } else if (doc === 'Emission test') {
      this.emissionTestFiles.splice(this.emissionTestFiles.indexOf(event), 1);
    } else if (doc === 'Road tax') {
      this.roadTaxFiles.splice(this.roadTaxFiles.indexOf(event), 1);
    } else if (doc === 'Fitness certificate') {
      this.fitnessCertificateFiles.splice(
        this.fitnessCertificateFiles.indexOf(event),
        1
      );
    } else {
      this.vehiclePhotoFiles.splice(this.vehiclePhotoFiles.indexOf(event), 1);
    }
  }

  openDialog() {
    // this.dialog.open(DialogElementsExampleDialog);
    // const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(CropperComponentComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(value => {
      console.log(value);
    })
  }
}
