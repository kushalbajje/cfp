import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Router } from '@angular/router';
import { HttpServices } from '../../services/apiservice';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component';

// import {Unassignedridelist} from '../services/unassignedridelist';

export interface driverList {
  driver_number: number;
  driver_name: string;
  duty_status: string;
}

export interface subvendorList {
  vendor_name: string;
  vendor_number: number;
}

const ELEMENT_DATA: driverList[] = [
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'on' },
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'on' },
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'off' },
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'off' },
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'on' },
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'off' },
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'on' },
  { driver_name: 'Test driver', driver_number: 8095068864, duty_status: 'on' },
  { driver_name: 'Test driver', driver_number: 9886279998, duty_status: 'on' },
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'off' },
  { driver_name: 'Test driver', driver_number: 8095068864, duty_status: 'on' },
  { driver_name: 'Test driver', driver_number: 9886279998, duty_status: 'on' },
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'off' },
];
const subVendorData: subvendorList[] = [
  { vendor_name: 'Test vendor 1', vendor_number: 9342407237 },
  { vendor_name: 'Test vendor 2', vendor_number: 9886279998 },
  { vendor_name: 'Test vendor 3', vendor_number: 8095068864 },
  { vendor_name: 'Test vendor 4', vendor_number: 9986611100 },
  { vendor_name: 'Test vendor 5', vendor_number: 8123078923 },
  { vendor_name: 'Test vendor 6', vendor_number: 8722455043 },
  { vendor_name: 'Test vendor 7', vendor_number: 8277277088 },
  { vendor_name: 'Test vendor 8', vendor_number: 9036004455 },
  { vendor_name: 'Test vendor 9', vendor_number: 7019338702 },
  { vendor_name: 'Test vendor 10', vendor_number: 9342407237 },
];

@Component({
  selector: 'app-unassigned',
  templateUrl: './unassigned.component.html',
  styleUrls: ['./unassigned.component.css'],
  host: {
    class: 'router-flex',
  },
})
export class UnassignedComponent implements OnInit {
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 12.9716;
  lng = 77.5946;
  toggle: boolean = true;
  map!: mapboxgl.Map;
  geocoder: any;
  user_id = localStorage.getItem('user_id');

  /******* Form fields ******/
  companyName: any;
  rideType: any;
  pickupDateAndTime: any;
  passengerName: any;
  passengerNumber: any;
  vehicleCategory: any;
  pickupLocation: any;
  dropOffLocation: any;
  // rides: any = [];
  constructor(
    private router: Router,
    private httpService: HttpServices,
    public _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    // let retrievedObject: any = localStorage.getItem('sessionObject');
    // let sessionObject = JSON.parse(retrievedObject);
    // if (retrievedObject.user_id == '' || retrievedObject.user_id == null) {
    //   this.router.navigate(['']);
    // }

    const reqObject = {
      user_id: this.user_id,
      ride_type: 'all',
      booking_type: 'unassigned',
      ride_date: new Date().getTime(),
    };

    // this.httpService.getTripsApi(reqObject).subscribe((response) => {
    //   this.rides = response.response.rides_list;
    //   console.log(response);

    // });
    setTimeout(() => {
      this.map = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.5946, 12.9716],
        zoom: 16,
      });
    }, 1);
    // this.geocoder = new MapboxGeocoder({
    //   accessToken: environment.mapbox.accessToken,
    //   types: 'country,region,place,postcode,locality,neighborhood',
    // });
    // this.geocoder.addTo('#geocoder');
  }

  ride_type: string[] = ['Airport', 'Urban', 'Rental', 'Outstation'];

  rides = [
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
      is_priority: 'true',
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
    },
  ];

  selected2: any;
  filter = ['hi', 'hello'];

  type = 'Unassigned trips';

  assigndriver(data: any) {
    this.toggle = false;

    
  }



  closeAssignDriver(_event: any) {
    this.toggle = true;
  }

  displayedColumns: string[] = [
    'driver_name',
    'driver_number',
    'duty_status',
    'action',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedVendorColumns: string[] = ['vendor_name', 'vendor_number', 'action'];

  vendorSource = new MatTableDataSource(subVendorData);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  @ViewChild('sorter1')
  sorter1!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.vendorSource.sort = this.sorter1;
  }

  onTabChanged($event: any) {
    console.log('*******************');
    console.log($event);
    console.log('*******************');
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }
}
