import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
    console.log(Y);
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
@Component({
  selector: 'app-attendace',
  templateUrl: './attendace.component.html',
  styleUrls: ['./attendace.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendaceComponent implements OnInit {
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
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
  /**
   * html functions
   */

 
}
