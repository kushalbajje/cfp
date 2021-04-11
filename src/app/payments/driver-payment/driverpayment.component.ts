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

import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';

export class CalendarDay {
  public date: Date;
  public isPastDate: boolean;
  public isToday: boolean;
  public timeArr: any;
  public timeInMilli: any;

  public getDateString() {
    return this.date.toISOString().split('T')[0];
  }

  constructor(d: Date, M: any, Y: any) {
    // console.log(moment().set({ year: Y, month: M }));
    if (M === 0) {
      Y += 1;
    }
    let thisMoment = moment().set({ year: Y, month: M });

    let startOfMonth = moment(thisMoment).startOf('month');
    let endOfMonth = moment(thisMoment).endOf('month');

    let firstDay = new Date(startOfMonth.toISOString()).getTime();
    let lastDay = new Date(endOfMonth.toISOString()).getTime();

    this.date = d;
    this.isPastDate =
      d.setHours(0, 0, 0, 0) < new Date(firstDay).setHours(0, 0, 0, 0) ||
      d.setHours(0, 0, 0, 0) > new Date(lastDay).setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }
}

@Pipe({
  name: 'chunk',
})
export class ChunkPipe implements PipeTransform {
  transform(calendarDaysArray: any, chunkSize: number): any {
    let calendarDays: any[][] = [];
    let weekDays: any[] = [];

    calendarDaysArray.map((day: any, index: number) => {
      weekDays.push(day);
      if (++index % chunkSize === 0) {
        calendarDays.push(weekDays);
        weekDays = [];
      }
    });
    return calendarDays;
  }
}

export interface driverList {
  driverName: string;
  driverPhoneNumber: number;
  totalDaysPresent: number;
  totalAmount: string;
}

const ELEMENT_DATA: driverList[] = [
  {
    driverName: 'James Jackson 1',
    driverPhoneNumber: 900202030,
    totalDaysPresent: 29,
    totalAmount: '₹ 40000',
  },
  {
    driverName: 'James Jackson 2',
    driverPhoneNumber: 900202030,
    totalDaysPresent: 29,
    totalAmount: '₹ 40000',
  },
  {
    driverName: 'James Jackson 3',
    driverPhoneNumber: 900202030,
    totalDaysPresent: 29,
    totalAmount: '₹ 40000',
  },
  {
    driverName: 'James Jackson 4',
    driverPhoneNumber: 900202030,
    totalDaysPresent: 29,
    totalAmount: '₹ 40000',
  },
  {
    driverName: 'James Jackson 5',
    driverPhoneNumber: 900202030,
    totalDaysPresent: 29,
    totalAmount: '₹ 40000',
  },
];

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMMM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-driverpayment',
  templateUrl: './driverpayment.component.html',
  styleUrls: ['./driverpayment.component.css'],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverpaymentComponent implements OnInit {
  date1: any;
  toggleViewTrips: boolean = false;
  subvendorName!: string;
  toggleDatePicker:boolean = true;
  /******************************************************************************/
  public date!: Date;
  public isPastDate!: boolean;
  public isToday!: boolean;
  public timeArr!: any;
  public timeInMilli!: any;

  public calendar: CalendarDay[] = [];
  public monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public displayMonth: string | undefined;
  public displayYear: string | undefined;
  private monthIndex: number = 0;



  /*****************************************************************************/


  response = [
    {
      date:'',
      presentCount: 22,
      absentCount: 30
    },
    {
      date:'',
      presentCount: 22,
      absentCount: 30
    },
    {
      date:'',
      presentCount: 22,
      absentCount: 30
    },
    {
      date:'',
      presentCount: 22,
      absentCount: 30
    },
    {
      date:'',
      presentCount: 22,
      absentCount: 30
    }
  ]



  constructor(private router: Router) {}

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
    setTimeout(() => {
      let newDate = new Date(this.date1);
      // newDate.setDate(newDate.getDate() + 1);
    }, 1500);

    this.date1 = new FormControl(moment());
    console.log();
    // this.date1 = moment(this.date1).format('DD/MM/YYYY HH:MM');
  }

  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date
    let day: Date = new Date(
      new Date().setMonth(new Date().getMonth() + monthIndex)
    );
    // set the dispaly month for UI

    let currentMonth = day.getMonth();

    this.displayMonth = this.monthNames[day.getMonth()];

    this.displayYear = '' + day.getFullYear();

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;
    for (var i = 0; i < 42; i++) {
      this.calendar.push(
        new CalendarDay(new Date(dateToAdd), currentMonth, day.getFullYear())
      );
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date) {
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month

    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(
          startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1)
        );
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }

  public increaseMonth() {
    if (this.monthIndex < 0) {
      this.monthIndex++;
      this.generateCalendarDays(this.monthIndex);
    }
  }

  public decreaseMonth() {
    this.monthIndex--;
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  getPresentCount($event: any) {
    console.log('present' + $event);
  }

  getAbsentCount($event: any) {
    console.log('Absent' + $event);
  }

  prevDay() {
    this.date1.setValue(this.date1.value.add(-1, 'months'));
  }

  nextDay() {
    this.date1.setValue(this.date1.value.add(1, 'months'));
  }

  navigateHome() {
    this.router.navigate(['/sidenav/bookings/unassigned']);
  }
  navigatePayments() {
    this.router.navigate(['/sidenav/payments']);
  }

  displayedColumns: string[] = [
    'driverName',
    'driverPhoneNumber',
    'totalDaysPresent',
    'totalAmount',
    'action',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  viewAttendance(info: string) {
    this.subvendorName = info;
    this.toggleViewTrips = true;
    this.toggleDatePicker = false;
  }
  closeViewAttendance() {
    this.toggleViewTrips = false;
    this.toggleDatePicker = true;
  }
}
