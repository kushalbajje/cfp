import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

export interface activeDriverList {
  driver_number: number;
  driver_name: string;
  vehicle_number: string;
  duty_status: string;
}

export interface assignedDriverList {
  driver_name: string;
  driver_number: number;
  vehicle_number: string;
  duty_status: string;
}

export interface suspendDriverList {
  driver_name: string;
  driver_number: number;
  vehicle_number: string;
}

const activeDriverList: activeDriverList[] = [
  {
    driver_name: 'Test driver 1',
    driver_number: 9342407237,
    vehicle_number: 'KA 41 MA 5345',
    duty_status: 'on',
  },
  {
    driver_name: 'Test driver 2',
    driver_number: 7485632145,
    vehicle_number: 'KA 41 MA 5345',
    duty_status: 'on',
  },
  {
    driver_name: 'Test driver 3',
    driver_number: 8964538865,
    vehicle_number: 'KA 41 MA 5345',
    duty_status: 'on',
  },
  {
    driver_name: 'Test driver 4',
    driver_number: 9342114545,
    vehicle_number: 'KA 41 MA 5345',
    duty_status: 'on',
  },
];
const assignedDriverList: assignedDriverList[] = [
  {
    driver_name: 'Test driver 1',
    driver_number: 9342407237,
    vehicle_number: 'KA 41 MA 5345',
    duty_status: 'off',
  },
  {
    driver_name: 'Test driver 2',
    driver_number: 8964538865,
    vehicle_number: 'KA 41 MA 5345',
    duty_status: 'off',
  },
  {
    driver_name: 'Test driver 3',
    driver_number: 7485632145,
    vehicle_number: 'KA 41 MA 5345',
    duty_status: 'off',
  },
];
const suspendDriverList: suspendDriverList[] = [
  {
    driver_name: 'Test driver 1',
    driver_number: 9342407237,
    vehicle_number: 'KA 41 MA 5345',
  },
  {
    driver_name: 'Test driver 2',
    driver_number: 9342407237,
    vehicle_number: 'KA 41 MA 5345',
  },
  {
    driver_name: 'Test driver 3',
    driver_number: 9342407237,
    vehicle_number: 'KA 41 MA 5345',
  },
];

@Component({
  selector: 'app-leasedfleet',
  templateUrl: './leasedfleet.component.html',
  styleUrls: ['./leasedfleet.component.css'],
})
export class LeasedfleetComponent implements OnInit {
  documents = [
    'Driver photo',
    'Driving licence',
    'Display badge',
    'Registration certificate',
    'Insurance',
    'Emission test',
    'Road tax',
    'Vehicle photo',
    'Aadhar card',
  ];

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

  activeVehicles = 100;
  inactiveVehicles = 50;
  totalVehicles = 150;
  toggleTable: boolean = true;
  toggleCountCard: boolean = true;
  toggleViewDetails: boolean = false;
  toggleAttachNewDriver: boolean = false;
  toggleButton: boolean = true;
  isDisabled: boolean = true;
  showEdit: boolean = true;
  showSave: boolean = false;
  showCancel: boolean = false;
  imageData: any = [];
  resetValue: boolean = false;
  toggleReuploadDocuments: boolean = false;
  isSuspended: boolean = false;
  vehicledata: [] = [];
  value: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

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

  ride_type: string[] = ['Airport', 'Urban', 'Rental', 'Outstation'];

  displayedColumns: string[] = [
    'driver_name',
    'driver_number',
    'vehicle_number',
    'duty_status',
    'action',
  ];
  dataSource = new MatTableDataSource(activeDriverList);

  assignedDriverColumns: string[] = [
    'driver_name',
    'driver_number',
    'vehicle_number',
    'duty_status',
    'action',
  ];
  assignedDriver = new MatTableDataSource(assignedDriverList);

  displayedSuspendDriverColumn: string[] = [
    'driver_name',
    'driver_number',
    'vehicle_number',
    'action',
  ];

  suspendDriver = new MatTableDataSource(suspendDriverList);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  @ViewChild('sorter1')
  sorter1!: MatSort;
  @ViewChild('sorter2')
  sorter2!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.assignedDriver.sort = this.sorter1;
    this.suspendDriver.sort = this.sorter2;
  }

  onTabChanged($event: any) {
    console.log('*******************');
    console.log($event);
    console.log('*******************');
  }

  showViewDetails(details: any) {
    if (details == 'activeDrivers') {
      this.isSuspended = false;
    } else if (details == 'inactiveDrivers') {
      this.isSuspended = false;
    } else {
      this.isSuspended = true;
    }
    this.toggleCountCard = false;
    this.toggleViewDetails = true;
    this.toggleButton = false;
    this.toggleTable = false;
  }

  closeViewDetails() {
    this.toggleCountCard = true;
    this.toggleViewDetails = false;
    this.toggleButton = true;
    this.toggleTable = true;
    this.isSuspended = false;
  }

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

  enableEdit() {
    this.isDisabled = false;
    this.showEdit = false;
    this.showCancel = true;
    this.showSave = true;
  }

  cancelEdit() {
    this.isDisabled = true;
    this.showEdit = true;
    this.showCancel = false;
    this.showSave = false;
    this.resetValue = true;
  }

  saveEdit() {
    /**
     * Perform update deatils
     */
    this.isDisabled = true;
    this.showEdit = true;
    this.showCancel = false;
    this.showSave = false;
  }

  content(data: any) {
    console.log(data);
    this.value = data;
  }

  img =
    'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/602a6954060ab244a40a5bd8/registrationCertificate.png';
}
