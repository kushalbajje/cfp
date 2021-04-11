import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css'],
})
export class AddBusinessComponent implements OnInit {
  documents = ['Driver Photo', 'Driving Licence', 'Display Badge'];
  driverPhotoFiles: File[] = [];
  driverLicenceFiles: File[] = [];
  badgeFiles: File[] = [];
  policeVerificationFiles: File[] = [];

  /** Declarations of input value **/
  companyName!: string;
  phoneNumber!: string;
  alternatePhoneNumber!: string;
  alternateEmail!: string;
  emailAddress!: string;
  address!: string;
  billingAddress!: string;
  panNumber!: string;
  gstType!: string;
  gstinNumber!: string;
  serviceTaxNumber!: string;
  reverseChargeAppllicable!: string;
  tds!: string;
  surcharge!: string;
  discount!: string;
  billingName!: string;
  packageCost!: number;
  additionalKilometer!: number;
  additionalHours!: number;

  accountHolderName!: string;
  accountNumber!: string;
  ifscCode!: string;

  states: string[] = ['Karnataka', 'Goa', 'Hyderabad'];
  cities: string[] = ['Bangalore', 'Mysore', 'Mumbai'];
  branches: string[] = ['Bangalore', 'Mysore', 'Dharwad'];
  vehicleType: string[] = ['Sedan', 'Hatchback', 'SUV'];
  packageDuration: string[] = ['2', '4', '6', '8', '10', '12'];
  packageKilometer: string[] = ['20', '40', '80', '100', '120'];
  conditional = ['Yes', 'No'];
  taxList = [''];

  isDisabled: boolean = true;
  isActive1: boolean = false;
  isActive2: boolean = false;
  isActive3: boolean = false;
  image: string | any;
  partnerName: string | any;
  document!: Document;
  profilePic!: string;

  badgeNumber!: string;
  policeVerificationNumber!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

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

  navigateManageBusiness() {
    this.router.navigate(['/sidenav/managebusiness']);
  }
  navigateHome() {
    this.router.navigate(['/sidenav/bookings/unassigned']);
  }
  closeAddNewBusiness() {
    this.router.navigate(['/sidenav/managebusiness']);
  }

  toggleStyle(data: any) {
    if (data === 'one') {
      this.isActive1 = !this.isActive1;
    } else if (data === 'two') {
      this.isActive2 = !this.isActive2;
    } else if (data === 'three') {
      this.isActive3 = !this.isActive3;
    }
  }

  closeAddNewDriver() {
    this.router.navigate(['sidenav/managedrivers']);
  }

  editInformation() {}
}
