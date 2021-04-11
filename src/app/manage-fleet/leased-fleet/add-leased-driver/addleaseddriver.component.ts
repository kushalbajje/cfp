import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addleaseddriver',
  templateUrl: './addleaseddriver.component.html',
  styleUrls: ['./addleaseddriver.component.css'],
})
export class AddleaseddriverComponent implements OnInit {
  documents = ['Driver Photo', 'Driving Licence', 'Display Badge'];
  driverPhotoFiles: File[] = [];
  driverLicenceFiles: File[] = [];
  badgeFiles: File[] = [];
  policeVerificationFiles: File[] = [];
  registrationCertificateFiles: File[] = [];
  emissionTestFiles: File[] = [];
  insuranceFiles: File[] = [];
  roadTaxFiles: File[] = [];
  vehiclePhotoFiles: File[] = [];

  /** Declarations of input value **/
  driverName!: string;
  phoneNumber!: string;
  alternateNumber!: string;
  panNumber!: string;
  aadharCardNumber!: string;
  address!: string;
  salaryPerMonth!: string;
  dailyWages!: string;
  dailyAllowances!: string;
  overTimePerHour!: string;
  outstationAllowancePerDay!: string;
  outstationNightAllowance!: string;
  drivingLicenceNumber!: string;
  badgeNumber!: string;
  policeVerificationNumber!: string;
  accountHolderName!: string;
  accountNumber!: string;
  ifscCode!: string;
  policyNumber!: string;
  registrationCertificateNumber!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  addressTypes: string[] = ['Home', 'Work', 'Others'];
  branches: string[] = ['Bangalore', 'Mysore', 'Dharwad'];
  times: string[] = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
  ];
  banks: string[] = [
    'State Bank of India',
    'Canara Bank',
    'HDFC Bank',
    'Axis Bank',
  ];

  onSelect(event: { addedFiles: any }, doc: string) {
    // console.log(doc);
    if (doc === 'Driver Photo') {
      if (this.driverPhotoFiles.length < 1)
        this.driverPhotoFiles.push(...event.addedFiles);
    } else if (doc === 'Driving licence') {
      if (this.driverLicenceFiles.length < 1)
        this.driverLicenceFiles.push(...event.addedFiles);
    } else if (doc === 'Police verification') {
      if (this.policeVerificationFiles.length < 1)
        this.policeVerificationFiles.push(...event.addedFiles);
    } else if (doc === 'Badge') {
      if (this.badgeFiles.length < 1) this.badgeFiles.push(...event.addedFiles);
    } else if (doc === 'Registration certificate') {
      if (this.registrationCertificateFiles.length < 1)
        this.registrationCertificateFiles.push(...event.addedFiles);
    } else if (doc === 'Insurance') {
      if (this.insuranceFiles.length < 1)
        this.insuranceFiles.push(...event.addedFiles);
    } else if (doc === 'Road tax') {
      if (this.roadTaxFiles.length < 1)
        this.roadTaxFiles.push(...event.addedFiles);
    } else if (doc === 'Vehicle photo') {
      if (this.vehiclePhotoFiles.length < 1)
        this.vehiclePhotoFiles.push(...event.addedFiles);
    } else {
      if (this.emissionTestFiles.length < 1)
        this.emissionTestFiles.push(...event.addedFiles);
    }
  }

  onRemove(event: File, doc: string) {
    if (doc === 'Driver Photo') {
      this.driverPhotoFiles.splice(this.driverPhotoFiles.indexOf(event), 1);
    } else if (doc === 'Driving Licence') {
      this.driverLicenceFiles.splice(this.driverLicenceFiles.indexOf(event), 1);
    } else if (doc == 'Police verification') {
      this.policeVerificationFiles.splice(
        this.policeVerificationFiles.indexOf(event),
        1
      );
    } else if (doc === 'Road tax') {
      this.roadTaxFiles.splice(this.roadTaxFiles.indexOf(event), 1);
    } else if (doc === 'Vehicle photo') {
      this.vehiclePhotoFiles.splice(this.vehiclePhotoFiles.indexOf(event), 1);
    } else {
      this.badgeFiles.splice(this.badgeFiles.indexOf(event), 1);
    }
  }
 
}
