import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CropperComponentComponent } from '../cropper-component/cropper-component.component';

@Component({
  selector: 'app-managesubvendors',
  templateUrl: './managesubvendors.component.html',
  styleUrls: ['./managesubvendors.component.css'],
})
export class ManagesubvendorsComponent implements OnInit {
  toggleAddNewVendor: boolean = false;
  toggleSubVendorDetails: boolean = false;
  toggleManageVendorBreadcrumb: boolean = true;
  toggleManageSubVendorBreadcrumb: boolean = false;
  toggleAddSubVendorButton: boolean = true;
  toggleEditImage: boolean = false;
  toggleCards: boolean = true;
  isDisabled: boolean = true;
  toggleAddVendorHeading: boolean = false;
  toggleManageVendorHeading: boolean = true;
  toggleVendorName: boolean = false;
  profilePicFiles: File[] = [];
  image: string | any;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

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
  taxtClassification!: string;
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
  accountHolderName!: string;
  accountNumber!: string;
  ifscCode!: string;
  profilePic!: string;

  states: string[] = ['Karnataka', 'Goa', 'Hyderabad'];
  cities: string[] = ['Bangalore', 'Mysore', 'Mumbai'];
  branches: string[] = ['Bangalore', 'Mysore', 'Dharwad'];
  taxes = ['CGST 2.5%', 'SGST 2.5%']

  conditional = ['Yes', 'No'];
  taxList = [''];
  constructor(private router: Router, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  subvendorsData = [
    {
      image:
        'https://picsum.photos/id/237/200/200',
      subvendorName: 'SST Travels',
    },
    {
      image:
        'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/6047607bffb7773bb84a915a/registrationcertificate.png',
      subvendorName: 'RTT Rentals',
    },
    {
      image:
        'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/6047607bffb7773bb84a915a/registrationcertificate.png',
      subvendorName: 'ARR Travels',
    },
  ];

  toggleManageSubvendors() {
    this.toggleVendorName = false;
    this.toggleAddVendorHeading = false;
    this.toggleAddSubVendorButton = true;
    this.toggleManageVendorHeading = true;
    this.toggleManageSubVendorBreadcrumb = false;
    this.toggleSubVendorDetails = false;
    this.toggleCards = true;
    this.toggleAddNewVendor = false;
  }

 

  addNewSubvendor() {
    this.toggleAddVendorHeading = true;
    this.toggleManageVendorHeading = false;
    this.toggleVendorName = false;
    this.toggleAddSubVendorButton = false;
    this.toggleManageSubVendorBreadcrumb = true;
    this.toggleAddNewVendor = true;
    this.toggleCards = false;
    this.toggleSubVendorDetails = false;
  }

  navigateAddNewVendor() {
    this.toggleAddVendorHeading = false;
    this.toggleManageVendorHeading = true;
    this.toggleVendorName = false;
    this.toggleAddSubVendorButton = true;
    this.toggleManageSubVendorBreadcrumb = false;
    this.toggleAddNewVendor = false;
    this.toggleCards = true;
    this.toggleSubVendorDetails = false;
    this.router.navigate(['/sidenav/managesubvendors/addsubvendor']);
  }

  onSelect(event: { addedFiles: any }) {
    // console.log(doc);
    this.profilePicFiles.push(...event.addedFiles);
  }

  onRemove(event: File) {
    this.profilePicFiles.splice(this.profilePicFiles.indexOf(event), 1);
  }

  veiwSubVendorDetails(data: any) {
    /** make API call fetch the details*/
    this.profilePic = data.image;
    this.toggleVendorName = true;
    this.toggleAddVendorHeading = false;
    this.toggleManageVendorHeading = false;
    this.toggleAddSubVendorButton = false;
    this.toggleManageSubVendorBreadcrumb = true;
    this.toggleManageVendorBreadcrumb = false;
    this.subvendorName = data.subvendorName;
    this.toggleSubVendorDetails = true;
    this.toggleCards = false;
    this.toggleAddNewVendor = false;
  }

  closeSubvendorDetails(){
    this.toggleVendorName = false;
    this.toggleAddVendorHeading = true;
    this.toggleManageVendorHeading = true;
    this.toggleAddSubVendorButton = true;
    this.toggleManageSubVendorBreadcrumb = false;
    this.toggleManageVendorBreadcrumb = true;
    this.toggleSubVendorDetails = false;
    this.toggleCards = true;
    this.toggleAddNewVendor = false;
    this.toggleAddVendorHeading = false;
  }


  closeViewSubVendorDetails() {
    this.toggleCards = true;
    this.toggleSubVendorDetails = false;
  }


  getProfilePic() {
    let dialogRef = this.dialog.open(CropperComponentComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((value) => {
      this.profilePic = value;
      console.log(this.profilePic.length);
      if (this.profilePic.length > 0) {
        this.toggleEditImage = false;
      } else {
        this.toggleEditImage = true;
      }
    });
  }

  onEdit() {
    this.isDisabled = !this.isDisabled;
    this.toggleEditImage = true;

  }
}
