import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CropperComponentComponent } from '../cropper-component/cropper-component.component';

@Component({
  selector: 'app-managebusiness',
  templateUrl: './managebusiness.component.html',
  styleUrls: ['./managebusiness.component.css'],
})
export class ManagebusinessComponent implements OnInit {
  toggleManageBusinessBreadcrumb: boolean = false;
  toggleAddNewBusinessButton: boolean = true;
  toggleAddNewBusiness: boolean = false;
  togglePartnerDetails: boolean = false;
  toggleEditImage: boolean = false;
  toggleCards: boolean = true;
  toggleHeading: boolean = true;
  isDisabled: boolean = true;
  isActive1: boolean = false;
  isActive2: boolean = false;
  isActive3: boolean = false;
  image: string | any;
  partnerName: string | any;
  document!: Document;
  profilePic!: string;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  /******Declarations of input value *******/
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

  partnersData = [
    {
      image: 'https://picsum.photos/id/237/200/200',
      partnerName: 'SST Travels',
    },
    {
      image:
        'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/6047607bffb7773bb84a915a/registrationcertificate.png',
      partnerName: 'RTT Rentals',
    },
    {
      image:
        'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/6047607bffb7773bb84a915a/registrationcertificate.png',
      partnerName: 'ARR Travels',
    },
  ];

  toggleManageBusiness() {
    this.toggleAddNewBusinessButton = true;
    this.togglePartnerDetails = false;
    this.toggleManageBusinessBreadcrumb = false;
    this.toggleAddNewBusiness = false;
    this.toggleCards = true;
    this.toggleHeading = true;
  }

  navigateAddNewBusiness() {
    this.toggleManageBusinessBreadcrumb = false;
    this.toggleAddNewBusiness = false;
    this.toggleHeading = true;
    this.toggleCards = true;
    this.togglePartnerDetails = false;
    this.router.navigate(['sidenav/managebusiness/addbusiness']);
  }

  closeAddNewBusiness() {
    this.toggleManageBusinessBreadcrumb = false;
    this.toggleAddNewBusiness = false;
    this.toggleCards = true;
    this.togglePartnerDetails = false;
  }

  addNewBusiness() {
    this.toggleHeading = false;
    this.toggleAddNewBusiness = true;
    this.toggleAddNewBusinessButton = false;
    this.toggleManageBusinessBreadcrumb = true;
    this.toggleCards = false;
  }

  // onSelect(event: { addedFiles: any }) {
  //   console.log(doc);
  //   this.profilePicFiles.push(...event.addedFiles);
  // }

  // onRemove(event: File) {
  //   this.profilePicFiles.splice(this.profilePicFiles.indexOf(event), 1);
  // }

  veiwBusinessDetails(data: any) {
    /** make API call fetch the details*/
    this.toggleHeading = false;
    this.partnerName = data.partnerName;
    this.profilePic = data.image;
    this.toggleManageBusinessBreadcrumb = true;
    this.image = data.image;
    this.partnerName = data.partnerName;
    this.togglePartnerDetails = true;
    this.toggleCards = false;
    this.toggleAddNewBusiness = false;
    this.toggleAddNewBusinessButton = false;
  }

  closeViewBusinessDetails() {
    this.toggleHeading = true;
    this.toggleManageBusinessBreadcrumb = false;
    this.togglePartnerDetails = false;
    this.toggleCards = true;
    this.toggleAddNewBusiness = true;
    this.toggleAddNewBusinessButton = true;
    this.toggleAddNewBusiness = false;
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

  editInformation() {
    this.isDisabled = !this.isDisabled;
    this.toggleEditImage = true;
  }

  openFileExplorer() {
    document.getElementById('file')!.click();
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

  // openFile() {
  //   this.toggelEditImage = false;
  //   document.getElementById('file')!.click();
  // }
}
