import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subvendor',
  templateUrl: './add-subvendor.component.html',
  styleUrls: ['./add-subvendor.component.css'],
})
export class AddSubvendorComponent implements OnInit {
  documents = ['Driver Photo', 'Driving Licence', 'Display Badge'];
  driverPhotoFiles: File[] = [];
  driverLicenceFiles: File[] = [];
  badgeFiles: File[] = [];
  policeVerificationFiles: File[] = [];

  /** Declarations of input value **/
  subvendorName!: string;
  website!: string;
  alternatePhoneNumber!: string;
  emailAddress!: string;
  contactNumber!: string;
  contactPersonName!: string;

  panNumber!: string;
  gstType!: string;
  gstinNumber!: string;
  serviceTaxNumber!: string;
  reverseChargeAppllicable!: string;
  tds!: number;
  revenueShare!: number;
  taxtClassification!:string;
  surcharge!: string;
  discount!: string;
  billingName!: string;
  billingAddress!: string;
  taxClassification!: string;
  earlyTime!: string;
  lateTime!: string;
  chequeName!: string;
  bankBranch!: string;
  bankName!: string;

  badgeNumber!: string;
  policeVerificationNumber!: string;
  accountHolderName!: string;
  accountNumber!: string;
  ifscCode!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  states: string[] = ['Karnataka', 'Goa', 'Hyderabad'];
  cities: string[] = ['Bangalore', 'Mysore', 'Mumbai'];
  branches: string[] = ['Bangalore', 'Mysore', 'Dharwad'];

  conditional = ['Yes', 'No'];
  taxList = [''];
  taxes = ['CGST 2.5%', 'SGST 2.5%']
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
    } else {
      if (this.badgeFiles.length < 1) this.badgeFiles.push(...event.addedFiles);
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
    } else {
      this.badgeFiles.splice(this.badgeFiles.indexOf(event), 1);
    }
  }

  closeAddNewDriver() {
    this.router.navigate(['sidenav/managesubvendor/addsubvendor']);
  }
}
