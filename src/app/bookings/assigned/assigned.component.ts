import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component';

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
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'on' },
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'on' },
  { driver_name: 'Test driver', driver_number: 9342407237, duty_status: 'off' },
];
const subVendorData: subvendorList[] = [
  { vendor_name: 'Test driver', vendor_number: 9342407237 },
  { vendor_name: 'Test driver', vendor_number: 9342407237 },
  { vendor_name: 'Test driver', vendor_number: 9342407237 },
  { vendor_name: 'Test driver', vendor_number: 9342407237 },
  { vendor_name: 'Test driver', vendor_number: 9342407237 },
  { vendor_name: 'Test driver', vendor_number: 9342407237 },
  { vendor_name: 'Test driver', vendor_number: 9342407237 },
  { vendor_name: 'Test driver', vendor_number: 9342407237 },
  { vendor_name: 'Test driver', vendor_number: 9342407237 },
  { vendor_name: 'Test driver', vendor_number: 9342407237 },
];

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.css'],
})



export class AssignedComponent implements OnInit {
  toggle: boolean = true;
  toggle1: boolean = false;


  /******* Form fields ******/
  companyName: any;
  rideType: any;
  pickupDateAndTime: any;
  passengerName: any;
  passengerNumber: any;
  vehicleCategory: any;
  pickupLocation: any;
  dropOffLocation: any;
  driverNumber: any;
  driverName: any;
  vehicleNumber: any;

  constructor(public _bottomSheet: MatBottomSheet ) {}

  ngOnInit(): void {
    setTimeout(() => {
      var map = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.5946, 12.9716],
        zoom: 16,
      });
    }, 1);
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
      vehicle_number: 'KA 41 MA 5345',
      driver_name: 'Euclid'
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
      vehicle_number: 'KA 41 MA 5345',
      driver_name: 'Euclid'
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
      vehicle_number: 'KA 41 MA 5345',
      driver_name: 'Euclid'
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
      vehicle_number: 'KA 41 MA 5345',
      driver_name: 'Euclid'
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
      vehicle_number: 'KA 41 MA 5345',
      driver_name: 'Euclid'
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
      vehicle_number: 'KA 41 MA 5345',
      driver_name: 'Euclid'
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
      vehicle_number: 'KA 41 MA 5345',
      driver_name: 'Euclid'
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
      vehicle_number: 'KA 41 MA 5345',
      driver_name: 'Euclid'
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
      vehicle_number: 'KA 41 MA 5345',
      driver_name: 'Euclid'
    },
    {
      company_name: 'Axem info technology',
      ride_type: 'Airport',
      trip_id: '12334AADSX',
      source_name: '1455, JP Nagar 1st Phase',
      destination_name: 'KIAL, Bangalore',
      pickup_time: '6:00 PM',
      vehicle_type: 'Sedan',
      vehicle_number: 'KA 41 MA 5345',
      driver_name: 'Euclid'
    },
  ];

  
  count = this.rides.length;
  type = 'Assigned trips';

  viewDetails(_event: any) {
    this.toggle = false;
  }
  closeviewDetails(_event: any) {
    this.toggle = true;
  }

  reassign(_event: any) {
    this.toggle1 = true;
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

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }
}
