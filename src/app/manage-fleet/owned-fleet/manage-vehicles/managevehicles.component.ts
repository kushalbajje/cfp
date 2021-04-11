import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

export interface unassignedVehicleList {
  vehicle_number: string;
  vehicle_name: string;
  vehicle_make: string;
  vehicle_model: number;
  vehicle_type: string;
}

export interface assignedVehicleList {
  vehicle_number: string;
  vehicle_name: string;
  vehicle_type: string;
  vehicle_make: string;
  vehicle_model: number;
  driver_name: string;
  driver_number: number;
}

const unassignedVehicleList: unassignedVehicleList[] = [
  {
    vehicle_number: 'KA 41 MA 5345',
    vehicle_name: 'i20',
    vehicle_make: 'Hyundai',
    vehicle_model: 2016,
    vehicle_type: 'Hatchback',
  },
  {
    vehicle_number: 'KA 41 MA 9502',
    vehicle_name: 'Verna',
    vehicle_make: 'Hyundai',
    vehicle_model: 2008,
    vehicle_type: 'Sedan',
  },
  {
    vehicle_number: 'KA 05 HM 5505',
    vehicle_name: 'Swift',
    vehicle_make: 'Maruthi',
    vehicle_model: 204,
    vehicle_type: 'Sedan',
  },
  {
    vehicle_number: 'KA 43 N 4002',
    vehicle_name: 'Etios',
    vehicle_make: 'Toyota',
    vehicle_model: 2012,
    vehicle_type: 'Sedan',
  },
];
const assignedVehicleList: assignedVehicleList[] = [
  {
    driver_name: 'Test driver 1',
    driver_number: 9342407237,
    vehicle_make: 'Hyundai',
    vehicle_name: 'i20',
    vehicle_model: 2016,
    vehicle_number: 'KA 41 MA 5345',
    vehicle_type: 'Sedan',
  },
  {
    driver_name: 'Test driver 2',
    driver_number: 8964538865,
    vehicle_name: 'i20',
    vehicle_make: 'Hyundai',
    vehicle_model: 2016,
    vehicle_number: 'KA 41 MA 5345',
    vehicle_type: 'Hatchback',
  },
  {
    driver_name: 'Test driver 3',
    driver_number: 7485632145,
    vehicle_name: 'verna',
    vehicle_make: 'Hyundai',
    vehicle_model: 2016,
    vehicle_number: 'KA 41 MA 5345',
    vehicle_type: 'SUV',
  },
];

@Component({
  selector: 'app-managevehicles',
  templateUrl: './managevehicles.component.html',
  styleUrls: ['./managevehicles.component.css'],
})
export class ManagevehiclesComponent implements OnInit {
  files: File[] = [];
  activeVehicles = 100;
  inactiveVehicles = 50;
  totalVehicles = 150;
  toggleTable: boolean = true;
  toggleCountCard: boolean = true;
  toggleViewDetails: boolean = false;
  toggleAddNewVehicle: boolean = false;
  toggleButton: boolean = true;
  isDisabled: boolean = true;
  showEdit: boolean = true;
  showSave: boolean = false;
  showCancel: boolean = false;
  imageData: any = [];
  resetValue: boolean = false;
  toggleReuploadDocuments: boolean = false;
  vehicledata: [] = [];
  value: any;

  // key: number = 0;

  documents = [
    'Registration certificate',
    'Insurance',
    'Emission test',
    'Road tax',
    'Vehicle photo',
  ];
  registrationCertificateFiles: File[] = [];
  insuranceFiles: File[] = [];
  emissionTestFiles: File[] = [];
  roadTaxFiles: File[] = [];
  fitnessCertificateFiles: File[] = [];
  vehiclePhotoFiles: File[] = [];
  vehicleDetails: any = [];
  vehicleData: string[] = [];

  constructor(
    private router: Router,
    private someone: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.assignedVehicle.sort = this.sort;
  }

  branches: string[] = ['Bangalore', 'Mysore', 'Dharwad'];
  drivers: string[] = ['Driver 1', 'Driver 2', 'Driver 3'];
  fuelType: string[] = ['Petrol', 'Diesel', 'CNG', 'Electric'];
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
    'vehicle_number',
    'vehicle_name',
    'vehicle_make',
    'vehicle_model',
    'vehicle_type',
    'action',
  ];

  dataSource = new MatTableDataSource(unassignedVehicleList);

  displayedAssignedVehicleColumn: string[] = [
    'vehicle_number',
    'vehicle_name',
    'vehicle_make',
    'vehicle_model',
    'vehicle_type',
    'driver_name',
    'driver_number',
    'action',
  ];

  assignedVehicle = new MatTableDataSource(assignedVehicleList);
  @ViewChild('cancel') el: ElementRef | undefined;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  @ViewChild('sorter1')
  sorter1!: MatSort;

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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.assignedVehicle.sort = this.sorter1;
  }

  onTabChanged($event: any) {
    console.log('*******************');
    console.log($event);
    console.log('*******************');
  }

  showViewDetails(data: any) {
    // console.log(data);
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
    this.isDisabled = true;
    while (this.vehicleDetails.length > 0) {
      this.vehicleDetails.pop();
    }
  }

  reuploadDocument() {
    this.toggleReuploadDocuments = true;
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
