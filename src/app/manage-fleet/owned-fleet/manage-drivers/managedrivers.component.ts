import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface driverList {
  driver_number: number;
  driver_name: string;
  duty_status: string;
}

export interface assignedDriverList {
  driver_name: string;
  driver_number: number;
  vehicle_number: string;
  vehicle_type: string;
}

export interface suspendDriverList {
  driver_name: string;
  driver_number: number;
}

const driverList: driverList[] = [
  {
    driver_name: 'Test driver 1',
    driver_number: 9342407237,
    duty_status: 'on',
  },
  {
    driver_name: 'Test driver 2',
    driver_number: 7485632145,
    duty_status: 'on',
  },
  {
    driver_name: 'Test driver 3',
    driver_number: 8964538865,
    duty_status: 'off',
  },
  {
    driver_name: 'Test driver 4',
    driver_number: 9342114545,
    duty_status: 'off',
  },
];
const assignedDriverList: assignedDriverList[] = [
  {
    driver_name: 'Test driver 1',
    driver_number: 9342407237,
    vehicle_number: 'KA 41 MA 5345',
    vehicle_type: 'Sedan',
  },
  {
    driver_name: 'Test driver 2',
    driver_number: 8964538865,
    vehicle_number: 'KA 41 MA 5345',
    vehicle_type: 'Hatchback',
  },
  {
    driver_name: 'Test driver 3',
    driver_number: 7485632145,
    vehicle_number: 'KA 41 MA 5345',
    vehicle_type: 'SUV',
  },
];
const suspendDriverList: suspendDriverList[] = [
  { driver_name: 'Test driver 1', driver_number: 9342407237 },
  { driver_name: 'Test driver 2', driver_number: 9342407237 },
  { driver_name: 'Test driver 3', driver_number: 9342407237 },
];
@Component({
  selector: 'app-managedrivers',
  templateUrl: './managedrivers.component.html',
  styleUrls: ['./managedrivers.component.css'],
})
export class ManagedriversComponent implements OnInit {
  documents = ['Driver Photo', 'Driving Licence', 'Display Badge'];
  driverPhotoFiles: File[] = [];
  driverLicenceFiles: File[] = [];
  badgeFiles: File[] = [];
  policeVerificationFiles: File[] = [];
  activeVehicles = 100;
  inactiveVehicles = 50;
  totalVehicles = 150;
  toggleTable: boolean = true;
  toggleCountCard: boolean = true;
  toggleViewDetails: boolean = false;
  toggleAddNewDriver: boolean = false;
  toggleButton: boolean = true;

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.assignedDriver.sort = this.sort;
    this.suspendDriver.sort = this.sort;
  }

  

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

  rides = [
    {
      id: '12334AADSX',
      pickup: '1455, JP Nagar 1st Phase',
      dropoff: 'KIAL, Bangalore',
    },
    {
      id: '12334AADSX',
      pickup: '1455, JP Nagar 1st Phase',
      dropoff: 'KIAL, Bangalore',
    },
    {
      id: '12334AADSX',
      pickup: '1455, JP Nagar 1st Phase',
      dropoff: 'KIAL, Bangalore',
    },
    {
      id: '12334AADSX',
      pickup: '1455, JP Nagar 1st Phase',
      dropoff: 'KIAL, Bangalore',
    },
    {
      id: '12334AADSX',
      pickup: '1455, JP Nagar 1st Phase',
      dropoff: 'KIAL, Bangalore',
    },
    {
      id: '12334AADSX',
      pickup: '1455, JP Nagar 1st Phase',
      dropoff: 'KIAL, Bangalore',
    },
    {
      id: '12334AADSX',
      pickup: '1455, JP Nagar 1st Phase',
      dropoff: 'KIAL, Bangalore',
    },
    {
      id: '12334AADSX',
      pickup: '1455, JP Nagar 1st Phase',
      dropoff: 'KIAL, Bangalore',
    },
    {
      id: '12334AADSX',
      pickup: '1455, JP Nagar 1st Phase',
      dropoff: 'KIAL, Bangalore',
    },
    {
      id: '12334AADSX',
      pickup: '1455, JP Nagar 1st Phase',
      dropoff: 'KIAL, Bangalore',
    },
  ];

  displayedColumns: string[] = [
    'driver_name',
    'driver_number',
    'duty_status',
    'action',
  ];
  dataSource = new MatTableDataSource(driverList);

  assignedDriverColumns: string[] = [
    'driver_name',
    'driver_number',
    'vehicle_number',
    'vehicle_type',
    'action',
  ];
  assignedDriver = new MatTableDataSource(assignedDriverList);

  displayedSuspendDriverColumn: string[] = [
    'driver_name',
    'driver_number',
    'action',
  ];
  suspendDriver = new MatTableDataSource(suspendDriverList);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  @ViewChild('sorter1')
  sorter1!: MatSort;
  @ViewChild('sorter2')
  sorter2!: MatSort;

  onSelect(event: { addedFiles: any }, doc: string) {
    // console.log(doc);
    if (doc === 'Driver Photo') {
      if (this.driverPhotoFiles.length < 1)
        this.driverPhotoFiles.push(...event.addedFiles);
    } else if (doc === 'Driving Licence') {
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
    } else if (doc === 'Police verification') {
      this.policeVerificationFiles.splice(
        this.policeVerificationFiles.indexOf(event),
        1
      );
    } else {
      this.badgeFiles.splice(this.badgeFiles.indexOf(event), 1);
    }
  }

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

  showViewDetails($event: any) {
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
  }

  img =
    'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/602a6954060ab244a40a5bd8/registrationCertificate.png';
}
