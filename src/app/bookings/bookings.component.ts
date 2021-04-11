import {
  Component,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
import { HttpServices } from '../services/apiservice';

// import { default as _rollupMoment } from 'moment';
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
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
  selector: '[app-bookings], [active]',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
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
export class BookingsComponent implements OnInit {
  // date = moment().format("DD/MM/YYYY");

  /**Passing data from bookings to side-nav to keep bookings link activve in side-nav**/

  date: any;
  date1: any;
  unassignedCount: any;
  assignedCount: any;
  ongoingCount: any;
  completedCount: any;
  cancelledCount: any;
  setIntervalObj: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpServices
  ) {}

  ngOnInit(): void {
    this.date1 = new Date();

    // this.setIntervalForRideCount({date: new Date().getTime()});
    this.unassignedCount = 0;
    this.assignedCount = 0;
    this.ongoingCount = 0;
    this.cancelledCount = 0;
    this.completedCount = 0;

    // this.date = moment(this.date).format('DD/MM/YYYY HH:MM');
  }

  setIntervalForRideCount(reqDataObj: any) {
    clearInterval(this.setIntervalObj);

    let requestObj = {
      user_id: '606429214056db76ac0d5e25',
      ride_date: reqDataObj.date,
    };

    this.httpService.getRidesCount(requestObj).subscribe((response) => {
      if (response.message == 'success') {
        this.unassignedCount = response.response.unassigned;
        this.assignedCount = response.response.assigned;
        this.ongoingCount = response.response.ongoing;
        this.cancelledCount = response.response.cancelled;
        this.completedCount = response.response.completed;
      } else {
        console.log(response);
      }
    });

    // this.setIntervalObj = setInterval(() => {

    //   this.httpService.getRidesCount(requestObj).subscribe((response) => {
    //     if (response.message == 'success') {
    //       this.unassignedCount = response.response.unassigned;
    //       this.assignedCount = response.response.assigned;
    //       this.ongoingCount = response.response.ongoing;
    //       this.cancelledCount = response.response.cancelled;
    //       this.completedCount = response.response.completed;
    //     } else {
    //       console.log(response);
    //     }
    //   });
    // }, 5000);
  }

  onNavigate() {
    this.router.navigate(['unassigned'], { relativeTo: this.route });
    this.router.navigate(['assigned'], { relativeTo: this.route });
    this.router.navigate(['ongoing'], { relativeTo: this.route });
    this.router.navigate(['completed'], { relativeTo: this.route });
    this.router.navigate(['cancelled'], { relativeTo: this.route });
  }

  addbooking() {
    this.router.navigate(['/sidenav/addbooking']);
  }
  bulkuploadbooking() {
    this.router.navigate(['/sidenav/bulkuploadbooking']);
  }

  prevDay() {
    // this.date.setValue(this.date.value.add(-1, 'days'));
    this.date1 = moment(this.date1, 'DD-MM-YYYY').add(-1, 'days');
    this.setIntervalForRideCount({
      date: moment(this.date1).toDate().getTime(),
    });
  }
  nextDay() {
    this.date1 = moment(this.date1, 'DD-MM-YYYY').add(1, 'days');
    this.setIntervalForRideCount({
      date: moment(this.date1).toDate().getTime(),
    });
    // this.date.setValue(this.date.value.add(1, 'days'));
  }

  // ngAfterViewInit(): void {
  //   const BACK_BUTTON = document.querySelector('.mat-calendar-previous-button');
  //   const FORWARD_BUTTON = document.querySelector('.mat-calendar-next-button');
  //   if (BACK_BUTTON) {
  //     this.renderer.listen(BACK_BUTTON, 'click', () => {
  //       console.log(this.dateAdapter.today());
  //       if (this.calendarDate.getMonth() === 0) {
  //         this.calendarDate.setFullYear(this.calendarDate.getFullYear() - 1);
  //         this.calendarDate.setMonth(11);
  //       } else {
  //         this.calendarDate.setMonth(this.calendarDate.getMonth() - 1);
  //       }
  //     });
  //   }
  //   if (FORWARD_BUTTON) {
  //     this.renderer.listen(FORWARD_BUTTON, 'click', () => {
  //       if (this.calendarDate.getMonth() === 11) {
  //         this.calendarDate.setFullYear(this.calendarDate.getFullYear() + 1);
  //         this.calendarDate.setMonth(0);
  //       } else {
  //         this.calendarDate.setMonth(this.calendarDate.getMonth() + 1);
  //       }
  //     });
  //   }
  // }

  // date = new FormControl(moment());

  // planModel: any = {start_time: new Date() };
}
