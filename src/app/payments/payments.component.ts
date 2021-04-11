import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  navigateHome() {
    this.router.navigate(['/sidenav/bookings/unassigned']);
  }

  navigatePaymentsType(type: string) {
    if (type === 'business') {
      this.router.navigate(['/sidenav/businesspayments']);
    } else if (type === 'subvendor') {
      this.router.navigate(['/sidenav/subvendorpayment']);
    } else {
      this.router.navigate(['/sidenav/driverpayment']);
    }
  }

  /**Chart Data **/

  chartData = [
    {
      label: 'Received',
      data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59, 33],
    },
    {
      label: 'Paid',
      data: [47, 9, 28, 54, 77, 51, 24, 36, 20, 11, 18, 35, 46],
    },
  ];

  chartOptions = {
    responsive: true, // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          barPercentage: 0.4,
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };
  labels = [
    '00:00',
    '02:00',
    '04:00',
    '06:00',
    '08:00',
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
    '20:00',
    '22:00',
    '24:00',
  ];
  toggleData(event: any) {
    if (event === 'Today') {
      const chartData = [
        {
          label: 'Received',
          data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59, 33],
        },
        {
          label: 'Paid',
          data: [47, 9, 28, 54, 77, 51, 24, 36, 20, 11, 18, 35, 46],
        },
      ];
      this.labels = [
        '00:00',
        '02:00',
        '04:00',
        '06:00',
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
        '24:00',
      ];
    } else if (event === 'Month') {
      const chartData = [
        {
          label: 'Received',
          data: [21, 56, 4, 31],
        },
        {
          label: 'Paid',
          data: [47, 9, 28, 54],
        },
      ];

      this.labels = ['week1', 'week2', 'week3', 'week4'];
    } else {
      const chartData = [
        {
          label: 'Received',
          data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59],
        },
        {
          label: 'Paid',
          data: [47, 9, 28, 54, 77, 51, 24, 36, 20, 11, 18, 35],
        },
      ];

      this.labels = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ];
    }
  }

  colors = [
    {
      // 1st Year.
      backgroundColor: 'rgba(3, 252, 44)',
    },
    {
      // 2nd Year.
      backgroundColor: 'rgba(252, 252, 3)',
    },
  ];

  onChartClick(event: any) {
    console.log(event);
  }

  /****************************************/

  businessPayments = [
    {
      image:
        'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/6047607bffb7773bb84a915a/insurance.png',
      companyName: 'Axem infotech',
      paymentDetails: 'Payment received on 17/10/2020',
      amount: '+ ₹ 90,000',
    },
    {
      image:
        'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/6047607bffb7773bb84a915a/insurance.png',
      companyName: 'Family travels',
      paymentDetails: 'Payment paid on 13/10/2020',
      amount: '+ ₹ 10,000',
    },
    {
      image:
        'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/6047607bffb7773bb84a915a/insurance.png',
      companyName: 'Cipla',
      paymentDetails: 'Payment received on 15/10/2020',
      amount: '+ ₹ 60,000',
    },
  ];
  transactionHistory = [
    {
      image:
        'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/6047607bffb7773bb84a915a/insurance.png',
      companyName: 'Axem infotech',
      paymentDetails: ' 17/10/2020',
      amount: '₹ 90,000',
    },
    {
      image:
        'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/6047607bffb7773bb84a915a/insurance.png',
      companyName: 'Family travels',
      paymentDetails: ' 13/10/2020',
      amount: '₹ 10,000',
    },
    {
      image:
        'https://hornok-driver.sgp1.digitaloceanspaces.com/vehicles/6047607bffb7773bb84a915a/insurance.png',
      companyName: 'Cipla',
      paymentDetails: '18/10/2020',
      amount: '₹ 60,000',
    },
  ];
}
