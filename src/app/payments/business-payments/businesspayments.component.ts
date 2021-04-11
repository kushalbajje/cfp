import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface driverList {
  businessName: string;
  tripsCompleted: number;
  totalAmount: number;
}

export interface viewTrips {
  tripId: string;
  pickup: string;
  dropOff: string;
  pickupDateAndTime: string;
  tripAmount: string;
}

const ELEMENT_DATA: driverList[] = [
  { businessName: 'Test business 1', tripsCompleted: 1000, totalAmount: 40000 },
  { businessName: 'Test business 2', tripsCompleted: 900, totalAmount: 39000 },
  { businessName: 'Test business 3', tripsCompleted: 450, totalAmount: 18000 },
  { businessName: 'Test business 4', tripsCompleted: 100, totalAmount: 10000 },
  { businessName: 'Test business 5', tripsCompleted: 500, totalAmount: 20000 },
  { businessName: 'Test business 6', tripsCompleted: 1500, totalAmount: 80000 },
];


const TRIP_DATA: viewTrips[] = [
  {
    tripId: '202012ADS233',
    pickup: 'JP Nagar 1st Phase',
    dropOff: 'KIAL, Bangalore',
    pickupDateAndTime: '20/02/2020 at 12:30 PM',
    tripAmount: '₹ 4000',
  },
  {
    tripId: '202012ADS244',
    pickup: 'JP Nagar 2st Phase',
    dropOff: 'KIAL, Bangalore',
    pickupDateAndTime: '20/03/2020 at 12:30 PM',
    tripAmount: '₹ 3000',
  },
  {
    tripId: '202012ADS253',
    pickup: 'JP Nagar 3st Phase',
    dropOff: 'KIAL, Bangalore',
    pickupDateAndTime: '20/04/2020 at 12:30 PM',
    tripAmount: '₹ 2000',
  },
  {
    tripId: '202012ADS283',
    pickup: 'JP Nagar 6st Phase',
    dropOff: 'KIAL, Bangalore',
    pickupDateAndTime: '22/08/2020 at 12:30 PM',
    tripAmount: '₹ 3500',
  },
];

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-businesspayments',
  templateUrl: './businesspayments.component.html',
  styleUrls: ['./businesspayments.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})




export class BusinesspaymentsComponent implements OnInit {
  date: any;
  month: any;
  toggleViewTrips: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      let newDate = new Date(this.date);
      // newDate.setDate(newDate.getDate() + 1);
    }, 1500);

    this.date = new FormControl(moment());
    console.log();
    // this.date = moment(this.date).format('DD/MM/YYYY HH:MM');
  }

  prevDay() {
    this.date.setValue(this.date.value.add(-1, 'months'));
  }

  nextDay() {
    this.date.setValue(this.date.value.add(1, 'months'));
  }

  navigateHome() {
    this.router.navigate(['/sidenav/bookings/unassigned']);
  }
  navigatePayments() {
    this.router.navigate(['/sidenav/payments']);
  }

  displayedColumns: string[] = [
    'businessName',
    'tripsCompleted',
    'totalAmount',
    'action',
  ];

  tripDisplayedColumns: string[] = [
    'tripId',
    'pickup',
    'dropOff',
    'pickupDateAndTime',
    'tripAmount',
    'action',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  tripSource = new MatTableDataSource(TRIP_DATA);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  @ViewChild('sorter1')
  sorter1!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.tripSource.sort = this.sorter1;
  }

  closeViewtrips() {
    this.toggleViewTrips = false;
  }
}
