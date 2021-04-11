import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.css'],
})
export class CancelledComponent implements OnInit {
  toggle: boolean = true;
  toggle1: boolean = false;

  constructor( public _bottomSheet: MatBottomSheet) {}

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
  count = this.rides.length;
  type = 'Cancelled trips';

  /******* Form fields ******/
  companyName: any;
  rideType: any;
  pickupDateAndTime: any;
  passengerName: any;
  passengerNumber: any;
  vehicleCategory: any;
  pickupLocation: any;
  dropOffLocation: any;

  viewDetails(_event: any) {
    this.toggle = false;
    this.toggle1 = true;
    setTimeout(() => {
      var map1 = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: 'map1',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.5946, 12.9716],
        zoom: 16,
      });
    }, 1);
  }
  closeviewDetails(_event: any) {
    setTimeout(() => {
      var map = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.5946, 12.9716],
        zoom: 16,
      });
    }, 1);
    this.toggle = true;
    this.toggle1 = false;
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }
}
