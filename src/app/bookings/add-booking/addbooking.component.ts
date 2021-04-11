import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as mapboxgl from 'mapbox-gl';
import { HttpServices } from 'src/app/services/apiservice';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetLocationComponent } from '../../get-location/get-location.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { result } from 'lodash';

interface LooseObject {
  [key: string]: any;
}

@Component({
  selector: 'app-addbooking',
  templateUrl: './addbooking.component.html',
  styleUrls: ['./addbooking.component.css'],
})
export class AddbookingComponent implements OnInit {
  pricing = '2';
  tag_number: any;
  requestObject: LooseObject = {};

  /**************Form data*******************/

  company_name: any;
  user_id = '606429214056db76ac0d5e25';
  rideType!: string;
  packageType: any;
  packageCost: any;
  rentalAdditionalKilometersCost: any;
  rentalAddditionalHoursCost: any;
  outstationMinimumKmPerDay: any;
  outstationRatePerKm: any;
  outstationDayBataCharge: any;
  outstationNightBataCharge: any;
  isAirportPickup!: boolean;
  isAirportDrop!: boolean;
  vehicleType!: string;
  sourceLatitude!: number;
  sourceLongitude!: number;
  destinationLatitude!: number;
  destinationLongitude!: number;
  source_name!: string;
  distance: number = 0;
  consumer_name!: string;
  consumer_phone_number!: number;
  consumer_email!: string;
  pickupMillis: any;
  multiple_pcikup: boolean = false;
  fareCalculationType: any;
  isFareAutoCalculated!: boolean;
  pickupLocation!: string;
  dropOffLocation!: string;
  pickupTime: any;
  region!: string;
  airportAdditionalKilometers: any;
  tripType: any;

  isSecondLocation: boolean = false;
  isThirdLocation: boolean = false;
  isFourthLocation: boolean = false;

  company_list: string[] = [];

  public date!: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate!: moment.Moment;
  public maxDate!: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required]),
  });
  // public dateControl = new FormControl(new Date());
  // public dateControlMinMax = new FormControl(new Date());

  ride_type: string[] = ['Airport', 'Urban', 'Rental', 'Outstation'];
  vehicle_type: string[] = ['Sedan', 'Hatchback', 'SUV'];
  package_type: string[] = ['2hrs 20km', '4hrs 40km', '6hrs 60km', '8hrs 80km'];
  travel_type: string[] = ['Oneway', 'Round trip'];

  constructor(
    private router: Router,
    private httpService: HttpServices,
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {}

  

  temp: any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  companyNameFormControl = new FormControl('', [Validators.required]);
  riderNameFormControl = new FormControl('', [Validators.required]);
  mobileNumber = new FormControl('', [
    Validators.required,
    Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
  ]);
  rideTypeFormControl = new FormControl('', [Validators.required]);
  pickupLocFormControl = new FormControl('', [Validators.required]);
  dropOffLocFromControl = new FormControl('', [Validators.required]);
  pickupTimeFromControl = new FormControl('', [Validators.required]);
  vehicleTypeFormControl = new FormControl('', [Validators.required]);
  tripTypeFormControl = new FormControl('',[Validators.required]);
  packageTypeFormControl = new FormControl('',[Validators.required]);
  packageCostFormControl = new FormControl('',[Validators.required]);
  additionalKmCostFormControl = new FormControl('', [Validators.required]);
  additionalHoursCostFormControl = new FormControl('',[Validators.required])
  minimumKmPerDayFormControl = new FormControl('',[Validators.required]);
  dayBataFormControl = new FormControl('',[Validators.required]);
  nightBataFormControl = new FormControl('',[Validators.required]);
  perKmCostFormControl = new FormControl('',[Validators.required]);

  ngOnInit(): void {
    let reqObject = {
      user_id: '606429214056db76ac0d5e25',
    };

    this.httpService.getCompanyList(reqObject).subscribe((result) => {
      console.log(result);
      if (result.message === 'success') {
        let name!: any;
        result.response.vendors_list.forEach((record: any) => {
          this.temp = {
            company_name: record.company_name,
            company_id: record.tag_number,
            company_fare_config: record.fare_config,
          };
          this.company_list.push(this.temp);
        });
      } else {
        console.log(result);
      }
    });
  }

  

  setValue() {
    if (this.pricing == '1') {
      this.isFareAutoCalculated = true;
    } else if (this.pricing == '2') {
      this.isFareAutoCalculated = false;
    }
  }

  // [({
  //   type: 'urban',
  //   vehicle_type: ['hatchback'],
  // },
  // {
  //   type: 'airport',
  //   vehicle_type: [],
  // },
  // {
  //   type: 'rental',
  //   vehicle_type: [],
  // },
  // {
  //   type: 'outstation',
  //   vehicle_type: [],
  //   travel_type: 'oneway trip',
  // },
  // {
  //   type: 'outstation',
  //   vehicle_type: [],
  //   travel_type: 'round trip',
  // })];
  companyData: any;
  isAutoCalculateEnabled() {
    let validateResult = false;
    if (this.company_name) {
      this.companyData = _.find(this.company_list, {
        company_id: this.company_name,
      });
      if (this.companyData) {
        let companyFareConfig = this.companyData.company_fare_config;
        console.log(companyFareConfig);
        if (this.rideType) {
          if (this.vehicleType) {
            for (let i = 0; i < companyFareConfig.length; i++) {
              if (companyFareConfig[i].type == this.rideType.toLowerCase()) {
                if (companyFareConfig[i].type == 'outstation') {
                  if (
                    companyFareConfig[i].travel_type ==
                    this.tripType.toLowerCase()
                  ) {
                    validateResult = companyFareConfig[i].vehicle_type.includes(
                      this.vehicleType.toLowerCase()
                    );
                    break;
                  }
                } else {
                  validateResult = companyFareConfig[i].vehicle_type.includes(
                    this.vehicleType.toLowerCase()
                  );
                  break;
                }
              }
            }
          }
        }
      }
    }

    this.isFareAutoCalculated = validateResult;
  }

  // validateAndGetCompayList(callback: any) {
  //   if (this.company_list.length > 0) {
  //     let company = _.find(this.company_list, { tag_number: this.tag_number });
  //     callback({company:})
  //   } else {
  //     callback(false);
  //   }
  // }

  // enableMultiplePickupLocation(data: string) {
  //   if (data == 'second') {
  //     this.isSecondLocation = true;
  //   } else if (data == 'third') {
  //     this.isThirdLocation = true;
  //   } else if (data == 'fourth') {
  //     this.isFourthLocation = true;
  //   }
  // }

  getLocation(data: any) {
    let dialogRef = this.dialog.open(GetLocationComponent, {
      height: '600px',
      width: '800px',
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (data == 'pickup') {
        this.pickupLocation = value.address;
        this.sourceLatitude = value.latitude;
        this.sourceLongitude = value.longitude;
        this.region = value.district;
        this.region = this.region.split(' ').splice(0, 1).join();
      } else if (data == 'dropOff') {
        this.dropOffLocation = value.address;
        this.destinationLatitude = value.latitude;
        this.destinationLongitude = value.longitude;
      }
      if (
        this.sourceLatitude &&
        this.sourceLongitude &&
        this.destinationLatitude &&
        this.destinationLongitude
      ) {
        this.calculateDistance(
          {
            source_latitude: this.sourceLatitude,
            source_longitude: this.sourceLongitude,
            destination_latitude: this.destinationLatitude,
            destination_longitude: this.destinationLongitude,
            ride_type: this.rideType,
          },
          (distanceResponse: any) => {
            this.requestObject.distance = distanceResponse.distance;
            if (this.rideType.toLowerCase() == 'airport') {
              this.httpService
                .checkTripLocation({
                  latitude: this.sourceLatitude,
                  longitude: this.sourceLongitude,
                  region: this.region,
                })
                .subscribe((data) => {
                  if (data.message == 'success') {
                    this.isAirportPickup = data.response.is_airport_location;
                  } else {
                    console.log(data);
                  }
                });
              this.httpService
                .checkTripLocation({
                  latitude: this.destinationLatitude,
                  longitude: this.destinationLongitude,
                  region: this.region,
                })
                .subscribe((data) => {
                  if (data.message == 'success') {
                    this.isAirportDrop = data.response.is_airport_location;
                  } else {
                    console.log(data);
                  }
                });
            }
          }
        );
      }
    });
  }

  distanceAPI: any;
  calculateDistance(data: any, callback: any) {
    // console.log(data);
    if (data.ride_type != 'rental') {
      callback({ distance: 0 });
    } else if (
      data.source_latitude &&
      data.source_longitude &&
      data.destination_latitude &&
      data.destination_longitude
    ) {
      this.distanceAPI =
        'http://192.168.1.228:5000/route/v1/driving/' +
        data.sourceLongitude +
        ',' +
        data.sourceLatitude +
        ';' +
        data.destinationLongitude +
        ',' +
        data.destinationLatitude +
        '?steps=true';
      this.getDistance('').subscribe((distanceResponse) => {
        let calculatedDistance = distanceResponse.routes[0].distance / 1000;
        callback({ distance: calculatedDistance });
      });
    } else {
      callback({ distance: 0 });
    }
  }

  public getDistance(req: any): Observable<any> {
    return this.httpClient.post(this.distanceAPI, req);
  }

  submit() {
    this.rideType = this.rideType.toLowerCase();
    this.vehicleType = this.vehicleType.toLowerCase();
    this.pickupTime = this.pickupTime.getTime();
    this.requestObject.tag_number = this.company_name;
    this.requestObject.user_id = this.user_id;
    this.requestObject.vehicle_type = this.vehicleType;
    this.requestObject.ride_type = this.rideType;
    this.requestObject.source_latitude = this.sourceLatitude;
    this.requestObject.source_longitude = this.sourceLongitude;
    this.requestObject.source_name = this.pickupLocation;
    this.requestObject.region = this.region;
    this.requestObject.consumer_name = this.consumer_name;
    this.requestObject.consumer_phone_number = this.consumer_phone_number;
    this.requestObject.consumer_email = this.consumer_email;
    this.requestObject.multiple_pickup = false;
    this.requestObject.calculation_type = this.fareCalculationType;
    this.requestObject.is_fare_auto_calculated = this.isFareAutoCalculated;
    this.requestObject.distance = this.distance;
    this.requestObject.approx_fare = this.packageCost;
    // approx_fare: 500,
    this.requestObject.departure_time = this.pickupTime;
    if (this.rideType == 'airport') {
      this.requestObject.destination_latitude = this.destinationLatitude;
      this.requestObject.destination_longitude = this.destinationLongitude;
      this.requestObject.destination_name = this.dropOffLocation;

      this.requestObject.is_airport_pickup = this.isAirportPickup;
      this.requestObject.is_airport_drop = this.isAirportDrop;

      this.requestObject.fare_details = {
        extra_kilometers_cost: this.airportAdditionalKilometers,
      };
    } else if (this.rideType == 'rental') {
      if (this.packageType == '2hrs 20km') {
        this.requestObject.package_type = this.packageType;
        this.requestObject.package_km = 20;
        this.requestObject.package_hours = 2;
        this.requestObject.package_fare = this.packageCost;
      } else if (this.packageType == '4hrs 40km') {
        this.requestObject.package_type = this.packageType;
        this.requestObject.package_km = 40;
        this.requestObject.package_hours = 4;
        this.requestObject.package_fare = this.packageCost;
      } else if (this.packageType == '6hrs 60km') {
        this.requestObject.package_type = this.packageType;
        this.requestObject.package_km = 60;
        this.requestObject.package_hours = 6;
        this.requestObject.package_fare = this.packageCost;
      } else if (this.packageType == '8hrs 80km') {
        this.requestObject.package_type = this.packageType;
        this.requestObject.package_km = 80;
        this.requestObject.package_hours = 8;
        this.requestObject.package_fare = this.packageCost;
      }
      this.requestObject.fare_details = {
        additional_kilometers_cost: this.rentalAdditionalKilometersCost,
        additional_hours_cost: this.rentalAddditionalHoursCost,
      };
      this.requestObject.departure_time = this.pickupTime;
    } else if (this.rideType == 'outstation') {
      this.requestObject.destination_latitude = this.destinationLatitude;
      this.requestObject.destination_longitude = this.destinationLongitude;
      this.requestObject.destination_name = this.dropOffLocation;
      this.requestObject.arrival_time = '';
      this.requestObject.fare_details = {
        minimum_km_per_day: this.outstationMinimumKmPerDay,
        rate_per_km: this.outstationRatePerKm,
        driver_day_bata: this.outstationDayBataCharge,
        driver_night_bata: this.outstationNightBataCharge,
      };
      this.requestObject.is_package = false;
      this.requestObject.package_name = '';
      if (this.tripType == 'Oneway') {
        this.requestObject.travel_type = 'oneway trip';
      } else if (this.tripType == 'Round trip') {
        this.requestObject.travel_type = 'round trip';
        this.requestObject.arrival_time = '';
      }
    } else if (this.rideType == 'urban') {
      this.requestObject.destination_latitude = this.destinationLatitude;
      this.requestObject.destination_longitude = this.destinationLongitude;
      this.requestObject.destination_name = this.dropOffLocation;
      this.requestObject.fare_details = {
        extra_km: this.airportAdditionalKilometers,
      };
    }

    this.httpService.addBooking(this.requestObject).subscribe((data) => {
      if (data.message == 'success') {
        console.log(data);
      } else {
        console.log(this.requestObject);
        console.log('***********');
        console.log(data);
      }
    });

    this.rideType = '';
  }
}
