import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Papa } from 'ngx-papaparse';
import { Observable } from 'rxjs';
import { HttpServices } from 'src/app/services/apiservice';

interface LooseObject {
  [key: string]: any;
}

@Component({
  selector: 'app-bulkuploadbooking',
  templateUrl: './bulkuploadbooking.component.html',
  styleUrls: ['./bulkuploadbooking.component.css'],
})
export class BulkuploadbookingComponent implements OnInit {
  /******************************Booking variables*****************************/

  requestObject: LooseObject = {};
  requestData: any;
  // company_name: any;
  user_id = '606429214056db76ac0d5e25';
  // rideType!: string;
  // packageType: any;
  // packageCost: any;
  // rentalAdditionalKilometersCost: any;
  // rentalAddditionalHoursCost: any;
  // outstationMinimumKmPerDay: any;
  // outstationRatePerKm: any;
  // outstationDayBataCharge: any;
  // outstationNightBataCharge: any;
  // isAirportPickup!: boolean;
  // isAirportDrop!: boolean;
  // vehicleType!: string;
  // sourceLatitude!: number;
  // sourceLongitude!: number;
  // destinationLatitude!: number;
  // destinationLongitude!: number;
  // source_name!: string;
  // distance: number = 0;
  // consumer_name!: string;
  // consumer_phone_number!: number;
  // consumer_email!: string;
  // pickupMillis: any;
  // arrivalMillis: any;
  // multiple_pcikup: boolean = false;
  // fareCalculationType: any;
  // isFareAutoCalculated: boolean = false;
  // pickupLocation!: string;
  // dropOffLocation!: string;
  // pickupTime: any;
  // region!: string;
  // airportAdditionalKilometers: any;
  // tripType: any;

  // pickupDate: any;
  // arrivalDate: any;
  // arrivalTime: any;
  distanceAPI: any;
  bookingData: any = [];
  /*****************************************************************************************/

  constructor(
    private router: Router,
    private papa: Papa,
    private httpService: HttpServices,
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {}

  openDialog(bookingData: any) {
    const dialogRef = this.dialog.open(BulkBookingPreview, {
      height: '700px',
      width: '1200px',
      data: bookingData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  files: File[] = [];

  onSelect(event: { addedFiles: any }) {
    console.log(event);
    if (this.files.length < 1) {
      this.files.push(...event.addedFiles);
    }

    // this.files[0]

    var file = this.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result;
      this.papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          let objects = results.data;

          this.createBooking(objects, (bookingResponse: any) => {
            this.openDialog(bookingResponse);
            this.requestData = {
              user_id: this.user_id,
              booking_data: bookingResponse,
            };
          });
        },
      });
    };
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  onFilesAdded(event: any) {}
  ngOnInit(): void {}

  onUpload() {
    if (this.requestObject) {
      this.httpService.bulkUploadBooking(this.requestData).subscribe((data) => {
        if (data.message == 'success') {
          console.log(data);
        } else {
          console.log(data);
          console.log('*********************');
          console.log(this.requestObject);
        }
        this.bookingData = [];
      });
    }
  }

  api: any;

  getCoordinates(data: any, callback: any) {
    let sourceLatitude = 0;
    let sourceLongitude = 0;
    let destinationLatitude = 0;
    let destinationLongitude = 0;

    // this.api =
    //   'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    //   data.source_name +
    //   '.json?limit=1&access_token=pk.eyJ1Ijoia3VzaGFsYmFqamUiLCJhIjoiY2tpbDVwdGpwMGdjbTM2bzhjZWsxaHRoeSJ9.hcfYHTTreNb0c8cJTzYXww&country=IN';
    // this.coordinates('').subscribe((_data) => {
    //   if (_data) {
    //     sourceLatitude = _data.features[0].geometry.coordinates[1];
    //     sourceLongitude = _data.features[0].geometry.coordinates[0];
    //   }

    //   if (data.destination_name) {
    //     this.api =
    //       'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    //       data.destination_name +
    //       '.json?limit=1&access_token=pk.eyJ1Ijoia3VzaGFsYmFqamUiLCJhIjoiY2tpbDVwdGpwMGdjbTM2bzhjZWsxaHRoeSJ9.hcfYHTTreNb0c8cJTzYXww&country=IN';
    //     this.coordinates('').subscribe((destData) => {
    //       if (destData) {
    //         destinationLatitude = destData.features[0].geometry.coordinates[1];
    //         destinationLongitude = destData.features[0].geometry.coordinates[0];
    //       }

    callback({
      sourceLatitude: 0, //sourceLatitude
      sourceLongitude: 0, //sourceLongitude
      destinationLatitude: 0, //destinationLatitude
      destinationLongitude: 0, //destinationLongitude
    });
    // });
    // } else {
    //   callback({
    //     sourceLatitude: sourceLatitude,
    //     sourceLongitude: sourceLongitude,
    //     destinationLatitude: destinationLatitude,
    //     destinationLongitude: destinationLongitude,
    //   });
    // }
    // });
  }

  checkAirportLocation(data: any, callback: any) {
    this.calculateDistance(data, (distanceResponse: any) => {
      // if (data.ride_type == 'airport') {
      //   let isAirportDrop = false;
      //   let isAirportPickup = false;
      //   this.httpService
      //     .checkTripLocation({
      //       latitude: data.source_latitude,
      //       longitude: data.source_longitude,
      //       region: data.region,
      //     })
      //     .subscribe((isAirportPickupData) => {
      //       if (isAirportPickupData.message == 'success') {
      //         isAirportPickup =
      //           isAirportPickupData.response.is_airport_location;
      //       } else {
      //         isAirportPickup = false;
      //       }

      //       this.httpService
      //         .checkTripLocation({
      //           latitude: data.destination_latitude,
      //           longitude: data.destination_longitude,
      //           region: data.region,
      //         })
      //         .subscribe((isAirportDropData) => {
      //           if (isAirportDropData.message == 'success') {
      //             isAirportDrop =
      //               isAirportDropData.response.is_airport_location;
      //           } else {
      //             isAirportDrop = false;
      //           }
      callback({
        is_airport_pickup: false, //isAirportPickup
        is_airport_drop: false, //isAirportDrop
        distance: 0, //distanceResponse
      });
      //     });
      // });
      // } else {
      //   console.log('here');
      //   callback({
      //     is_airport_pickup: false,
      //     is_airport_drop: false,
      //     distance: distanceResponse,
      //   });
      //   }
    });
  }

  createBooking(bookingRequestObject: any, callback: any) {
    if (bookingRequestObject.length > 0) {
      let counter = 0;
      let temp = Array();
      bookingRequestObject.forEach((eachBookingData: any) => {
        let bookingObj: LooseObject = {};
        bookingObj.tag_number = eachBookingData.tag_number;
        bookingObj.user_id = this.user_id;
        bookingObj.vehicle_type = eachBookingData.vehicle_type;
        bookingObj.ride_type = eachBookingData.ride_type;
        bookingObj.source_name = eachBookingData.source_name;
        bookingObj.region = eachBookingData.region;
        bookingObj.consumer_name = eachBookingData.consumer_name;
        bookingObj.consumer_phone_number =
          eachBookingData.consumer_phone_number;
        bookingObj.consumer_email = eachBookingData.consumer_email;
        bookingObj.multiple_pickup = false;
        bookingObj.calculation_type = eachBookingData.calculation_type;
        if (eachBookingData.is_fare_auto_calculated.toLowerCase() == 'false') {
          bookingObj.is_fare_auto_calculated = false;
        } else {
          bookingObj.is_fare_auto_calculated = false;
        }
        bookingObj.distance = eachBookingData.distance;
        let pickupMillis =
          eachBookingData.pickup_date + ' ' + eachBookingData.departure_time;
        let newDate = moment(pickupMillis, 'DD/MM/YYYY hh:mm A');

        bookingObj.departure_time = newDate.toDate().getTime();

        if (eachBookingData.destination_name) {
          bookingObj.destination_name = eachBookingData.destination_name;
        } else {
          bookingObj.destination_name = false;
        }

        this.getCoordinates(
          {
            source_name: bookingObj.source_name,
            destination_name: bookingObj.destination_name,
          },
          (foundLatLng: any) => {
            bookingObj.source_latitude = foundLatLng.sourceLatitude;
            bookingObj.source_longitude = foundLatLng.sourceLongitude;
            bookingObj.destination_latitude = foundLatLng.destinationLatitude;
            bookingObj.destination_longitude = foundLatLng.destinationLongitude;
            this.checkAirportLocation(
              {
                source_latitude: bookingObj.source_latitude,
                source_longitude: bookingObj.source_longitude,
                destination_latitude: bookingObj.destination_latitude,
                destination_longitude: bookingObj.destination_longitude,
                region: bookingObj.region,
                ride_type: bookingObj.ride_type,
              },
              (checkedLocation: any) => {
                if (checkedLocation) {
                  if (bookingObj.ride_type == 'airport') {
                    bookingObj.approx_fare = eachBookingData.approx_fare;
                    bookingObj.is_airport_drop =
                      checkedLocation.is_airport_drop;
                    bookingObj.is_airport_pickup =
                      checkedLocation.is_airport_pickup;
                    bookingObj.destination_name =
                      eachBookingData.destination_name;
                    bookingObj.fare_details = {
                      extra_kilometers_cost:
                        eachBookingData.extra_kilometers_cost,
                    };
                  } else if (bookingObj.ride_type == 'rental') {
                    bookingObj.approx_fare = eachBookingData.approx_fare;
                    bookingObj.package_hours = eachBookingData.package_hours;
                    bookingObj.package_km = eachBookingData.package_km;
                    bookingObj.package_fare = eachBookingData.approx_fare;
                    bookingObj.package_type =
                      bookingObj.package_hours +
                      'hrs ' +
                      bookingObj.package_km +
                      'km';

                    bookingObj.fare_details = {
                      additional_kilometers_cost:
                        eachBookingData.additional_kilometers_cost,
                      additional_hours_cost:
                        eachBookingData.additional_hours_cost,
                    };
                  } else if (bookingObj.ride_type == 'outstation') {
                    bookingObj.package_fare = eachBookingData.approx_fare;

                    bookingObj.destination_name =
                      eachBookingData.destination_name;
                    bookingObj.travel_type = eachBookingData.travel_type;
                    bookingObj.fare_details = {
                      minimum_km_per_day: eachBookingData.minimum_km_per_day,
                      rate_per_km: eachBookingData.rate_per_km,
                      driver_day_bata: eachBookingData.driver_day_bata,
                      driver_night_bata: eachBookingData.driver_night_bata,
                    };
                    if (bookingObj.travel_type == 'round trip') {
                      let arrivalMillis =
                        bookingObj.arrivalDate + ' ' + bookingObj.arrivalTime;
                      let newDate = moment(arrivalMillis, 'DD/MM/YYYY hh:mm A');
                      bookingObj.arrival_time = newDate.toDate().getTime();
                    }
                    bookingObj.arrival_time = bookingObj.departure_time;
                    bookingObj.is_package = false;
                    bookingObj.package_name = '';
                  } else if (bookingObj.ride_type == 'urban') {
                    bookingObj.approx_fare = eachBookingData.approx_fare;
                    bookingObj.destination_name =
                      eachBookingData.destination_name;
                    bookingObj.fare_details = {
                      extra_kilometers_cost:
                        eachBookingData.extra_kilometers_cost,
                    };
                  }
                  temp.push(bookingObj);
                  counter++;
                  if (counter == bookingRequestObject.length) {
                    callback(temp);
                  }
                }
              }
            );
          }
        );
      });
    } else {
      callback([]);
    }
  }

  calculateDistance(data: any, callback: any) {
    callback({ distance: 0 });
    // if (data.ride_type != 'rental') {
    //   callback({ distance: 0 });
    // } else if (
    //   data.source_latitude &&
    //   data.source_longitude &&
    //   data.destination_latitude &&
    //   data.destination_longitude
    // ) {
    //   this.distanceAPI =
    //     'http://192.168.1.228:5000/route/v1/driving/' +
    //     data.sourceLongitude +
    //     ',' +
    //     data.sourceLatitude +
    //     ';' +
    //     data.destinationLongitude +
    //     ',' +
    //     data.destinationLatitude +
    //     '?steps=true';
    //   this.getDistance('').subscribe((distanceResponse) => {
    //     let calculatedDistance = distanceResponse.routes[0].distance / 1000;
    //     callback({ distance: calculatedDistance });
    //   });
    // } else {
    //   callback({ distance: 0 });
    // }
  }

  public getDistance(req: any): Observable<any> {
    return this.httpClient.post(this.distanceAPI, req);
  }

  public coordinates(req: any): Observable<any> {
    return this.httpClient.get(this.api, req);
  }
}

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import * as _ from 'lodash';
import { element } from 'protractor';
import { FormControl, Validators } from '@angular/forms';
import { GetLocationComponent } from 'src/app/get-location/get-location.component';
import { FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatTable } from '@angular/material/table';

export interface bookingData {
  slNo: number;
  businessName: string;
  vehicleType: string;
  rideType: string;
  pickupDateAndTime: string;
  travelType: string;
}

const bookingData: bookingData[] = [];

@Component({
  selector: 'bulk-booking-preview',
  templateUrl: 'bulk-booking-preview.html',
  styleUrls: ['./bulk-booking-preview.css'],
})
export class BulkBookingPreview {
  bookingDetails: any;
  toggleViewDetails: boolean = false;

  /**********Form declaration***********/
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
  multiple_pickup: boolean = false;
  fareCalculationType: any;
  isFareAutoCalculated!: boolean;
  pickupLocation!: string;
  dropOffLocation!: string;
  pickupTime: any;
  region!: string;
  airportAdditionalKilometers: any;
  tripType: any;

  company_list: string[] = [];

  /**************/
  viewDetailsId: any;
  /*************/

  /*******List values********/
  ride_type: string[] = ['Airport', 'Urban', 'Rental', 'Outstation'];
  vehicle_type: string[] = ['Sedan', 'Hatchback', 'SUV'];
  package_type: string[] = ['2hrs 20km', '4hrs 40km', '6hrs 60km', '8hrs 80km'];
  travel_type: string[] = ['Oneway trip', 'Round trip'];

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
  public dateControl = new FormControl(new Date());
  public dateControlMinMax = new FormControl(new Date());

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpServices,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  // table!: MatTableDataSource<string>;

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
  tripTypeFormControl = new FormControl('', [Validators.required]);
  packageTypeFormControl = new FormControl('', [Validators.required]);
  packageCostFormControl = new FormControl('', [Validators.required]);
  additionalKmCostFormControl = new FormControl('', [Validators.required]);
  additionalHoursCostFormControl = new FormControl('', [Validators.required]);
  minimumKmPerDayFormControl = new FormControl('', [Validators.required]);
  dayBataFormControl = new FormControl('', [Validators.required]);
  nightBataFormControl = new FormControl('', [Validators.required]);
  perKmCostFormControl = new FormControl('', [Validators.required]);

  ngOnInit() {
    // will log the entire data object
    let travelType = '';
    let counter = 1;
    this.data.forEach((eachBookingObject: any) => {
      // let date = eachBookingObject.pickup_time.getDate();

      if (eachBookingObject.ride_type == 'outstation') {
        console.log('here');
        travelType = eachBookingObject.travel_type;
      }
      eachBookingObject.slNo = counter;
      bookingData.push({
        slNo: counter,
        businessName: eachBookingObject.tag_number,
        vehicleType: eachBookingObject.vehicle_type,
        rideType: eachBookingObject.ride_type,
        pickupDateAndTime: eachBookingObject.pickup_time,
        travelType: travelType,
      });
      counter++;
    });
    console.log(this.data);
  }

  displayedColumns: string[] = [
    'slNo',
    'businessName',
    'vehicleType',
    'rideType',
    'pickupDateAndTime',
    'action',
  ];

  dataSource = new MatTableDataSource(bookingData);

  viewDeatils(bookingData: any) {
    this.getCompanyList({ user_id: '' }, (foundCompanyList: any) => {
      if (true) {
        let companyName = _.find(foundCompanyList, {
          tag_number: bookingData.tag_number,
        });

        this.getBookingData(bookingData, (foundBookingDetails: any) => {
          if (foundBookingDetails) {
            let rideType =
              foundBookingDetails.ride_type.charAt(0).toUpperCase() +
              foundBookingDetails.ride_type.substring(1);
            this.rideType = rideType;
            this.vehicleType =
              foundBookingDetails.vehicle_type.charAt(0).toUpperCase() +
              foundBookingDetails.vehicle_type.substring(1);
            this.pickupTime = foundBookingDetails.pickup_time;
            this.company_name = '';

            this.sourceLatitude = foundBookingDetails.source_latitude;
            this.sourceLongitude = foundBookingDetails.source_longitude;
            this.pickupLocation = foundBookingDetails.source_name;
            this.region = foundBookingDetails.region;
            this.consumer_name = foundBookingDetails.consumer_name;
            this.consumer_phone_number =
              foundBookingDetails.consumer_phone_number;
            this.consumer_email = foundBookingDetails.consumer_email;
            this.multiple_pickup = false;
            this.fareCalculationType = foundBookingDetails.calculation_type;
            this.isFareAutoCalculated = false;
            this.distance = foundBookingDetails.distance;
            this.packageCost = foundBookingDetails.approx_fare;
            // approx_fare: 500,
            if (foundBookingDetails.ride_type == 'airport') {
              this.destinationLatitude =
                foundBookingDetails.destination_latitude;
              this.destinationLongitude =
                foundBookingDetails.destination_longitude;
              this.dropOffLocation = foundBookingDetails.destination_name;

              this.isAirportPickup = foundBookingDetails.is_airport_pickup;
              this.isAirportDrop = foundBookingDetails.is_airport_drop;

              this.airportAdditionalKilometers =
                foundBookingDetails.fare_details.extra_kilometers_cost;
            } else if (foundBookingDetails.ride_type == 'rental') {
              this.packageCost = foundBookingDetails.package_fare;
              this.packageType = foundBookingDetails.package_type;
              this.rentalAdditionalKilometersCost =
                foundBookingDetails.fare_details.additional_kilometers_cost;
              this.rentalAddditionalHoursCost =
                foundBookingDetails.fare_details.additional_hours_cost;
            } else if (foundBookingDetails.ride_type == 'outstation') {
              this.packageCost = foundBookingDetails.package_fare;
              this.destinationLatitude =
                foundBookingDetails.destination_latitude;
              this.destinationLongitude =
                foundBookingDetails.destination_longitude;
              this.dropOffLocation = foundBookingDetails.destination_name;

              this.outstationMinimumKmPerDay =
                foundBookingDetails.fare_details.minimum_km_per_day;
              this.outstationRatePerKm =
                foundBookingDetails.fare_details.rate_per_km;
              this.outstationDayBataCharge =
                foundBookingDetails.fare_details.driver_day_bata;
              this.outstationNightBataCharge =
                foundBookingDetails.fare_details.driver_night_bata;
              // this.is_package = false;
              // this..package_name = '';
              this.tripType =
                foundBookingDetails.travel_type.charAt(0).toUpperCase() +
                foundBookingDetails.travel_type.substring(1);
            } else if (foundBookingDetails.ride_type == 'urban') {
              this.destinationLatitude =
                foundBookingDetails.destination_latitude;
              this.destinationLongitude =
                foundBookingDetails.destination_longitude;
              this.dropOffLocation = foundBookingDetails.destination_name;
              this.airportAdditionalKilometers =
                foundBookingDetails.fare_details.extra_km;
            }
          }
        });
      }
    });

    this.bookingDetails = _.find(this.data, {
      tag_number: bookingData.businessName,
      vehicle_type: bookingData.vehicleType,
      ride_type: bookingData.rideType,
      travel_type: bookingData.travelType,
      // pickupDateAndTime: bookingData.pickupDateAndTime
    });
    this.viewDetailsId = bookingData.slNo;
    this.toggleViewDetails = true;
  }

  onUpdate() {
    let requestObject: LooseObject = {};
    this.rideType = this.rideType.toLowerCase();
    this.vehicleType = this.vehicleType.toLowerCase();
    this.pickupTime = this.pickupTime.getTime();
    requestObject.tag_number = this.company_name;
    requestObject.user_id = this.user_id;
    requestObject.vehicle_type = this.vehicleType;
    requestObject.ride_type = this.rideType;
    requestObject.source_latitude = this.sourceLatitude;
    requestObject.source_longitude = this.sourceLongitude;
    requestObject.source_name = this.pickupLocation;
    requestObject.region = this.region;
    requestObject.consumer_name = this.consumer_name;
    requestObject.consumer_phone_number = this.consumer_phone_number;
    requestObject.consumer_email = this.consumer_email;
    requestObject.multiple_pickup = false;
    requestObject.calculation_type = this.fareCalculationType;
    requestObject.is_fare_auto_calculated = this.isFareAutoCalculated;
    requestObject.distance = this.distance;
    requestObject.approx_fare = this.packageCost;
    // approx_fare: 500,
    requestObject.departure_time = this.pickupTime;
    if (this.rideType == 'airport') {
      requestObject.destination_latitude = this.destinationLatitude;
      requestObject.destination_longitude = this.destinationLongitude;
      requestObject.destination_name = this.dropOffLocation;

      requestObject.is_airport_pickup = this.isAirportPickup;
      requestObject.is_airport_drop = this.isAirportDrop;

      requestObject.fare_details = {
        extra_kilometers_cost: this.airportAdditionalKilometers,
      };
    } else if (this.rideType == 'rental') {
      if (this.packageType == '2hrs 20km') {
        requestObject.package_type = this.packageType;
        requestObject.package_km = 20;
        requestObject.package_hours = 2;
        requestObject.package_fare = this.packageCost;
      } else if (this.packageType == '4hrs 40km') {
        requestObject.package_type = this.packageType;
        requestObject.package_km = 40;
        requestObject.package_hours = 4;
        requestObject.package_fare = this.packageCost;
      } else if (this.packageType == '6hrs 60km') {
        requestObject.package_type = this.packageType;
        requestObject.package_km = 60;
        requestObject.package_hours = 6;
        requestObject.package_fare = this.packageCost;
      } else if (this.packageType == '8hrs 80km') {
        requestObject.package_type = this.packageType;
        requestObject.package_km = 80;
        requestObject.package_hours = 8;
        requestObject.package_fare = this.packageCost;
      }
      requestObject.fare_details = {
        additional_kilometers_cost: this.rentalAdditionalKilometersCost,
        additional_hours_cost: this.rentalAddditionalHoursCost,
      };
      requestObject.departure_time = this.pickupTime;
    } else if (this.rideType == 'outstation') {
      requestObject.destination_latitude = this.destinationLatitude;
      requestObject.destination_longitude = this.destinationLongitude;
      requestObject.destination_name = this.dropOffLocation;
      requestObject.arrival_time = '';
      requestObject.fare_details = {
        minimum_km_per_day: this.outstationMinimumKmPerDay,
        rate_per_km: this.outstationRatePerKm,
        driver_day_bata: this.outstationDayBataCharge,
        driver_night_bata: this.outstationNightBataCharge,
      };
      requestObject.is_package = false;
      requestObject.package_name = '';
      if (this.tripType == 'Oneway trip') {
        requestObject.travel_type = 'oneway trip';
      } else if (this.tripType == 'Round trip') {
        requestObject.travel_type = 'round trip';
        requestObject.arrival_time = '';
      }
    } else if (this.rideType == 'urban') {
      requestObject.destination_latitude = this.destinationLatitude;
      requestObject.destination_longitude = this.destinationLongitude;
      requestObject.destination_name = this.dropOffLocation;
      requestObject.fare_details = {
        extra_km: this.airportAdditionalKilometers,
      };
    }

    console.log(requestObject);
  }

  goBack() {
    this.toggleViewDetails = false;
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  removeBooking(dataToBeRemoved: any) {
    if (dataToBeRemoved.slNo) {
      _.remove(this.data, { slNo: dataToBeRemoved.slNo });
      _.remove(bookingData, { slNo: dataToBeRemoved.slNo });
    } else if (dataToBeRemoved == 'removes') {
      _.remove(this.data, { slNo: this.viewDetailsId });
      _.remove(bookingData, { slNo: dataToBeRemoved.slNo });
    }
    this.table.renderRows();
    console.log(this.data);
  }

  getCompanyList(data: any, callback: any) {
    let temp = Object();
    // this.httpService.getCompanyList(data).subscribe((result) => {
    //   if (result.message === 'success') {
    //     result.response.vendors_list.forEach((record: any) => {
    //       temp = {
    //         company_name: record.company_name,
    //         company_id: record.tag_number,
    //         company_fare_config: record.fare_config,
    //       };
    //       this.company_list.push(temp);
    //     });
    //   } else {
    //     console.log(result);
    //   }
    callback({
      company_list: [], //this.company_list
    });
    // });
  }

  getBookingData(data: any, callback: any) {
    if (data.ride_type == 'outstation') {
      this.bookingDetails = _.find(this.data, {
        tag_number: data.businessName,
        vehicle_type: data.vehicleType,
        ride_type: data.rideType,
        travel_type: data.travelType,
        // pickupDateAndTime: bookingData.pickupDateAndTime
      });
    } else {
      this.bookingDetails = _.find(this.data, {
        tag_number: data.businessName,
        vehicle_type: data.vehicleType,
        ride_type: data.rideType,

        // pickupDateAndTime: bookingData.pickupDateAndTime
      });
    }

    callback(this.bookingDetails);
  }

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
            // this.requestObject.distance = distanceResponse.distance;
            // if (this.rideType.toLowerCase() == 'airport') {
            //   this.httpService
            //     .checkTripLocation({
            //       latitude: this.sourceLatitude,
            //       longitude: this.sourceLongitude,
            //       region: this.region,
            //     })
            //     .subscribe((data) => {
            //       if (data.message == 'success') {
            //         this.isAirportPickup = data.response.is_airport_location;
            //       } else {
            //         console.log(data);
            //       }
            //     });
            //   this.httpService
            //     .checkTripLocation({
            //       latitude: this.destinationLatitude,
            //       longitude: this.destinationLongitude,
            //       region: this.region,
            //     })
            //     .subscribe((data) => {
            //       if (data.message == 'success') {
            //         this.isAirportDrop = data.response.is_airport_location;
            //       } else {
            //         console.log(data);
            //       }
            //     });
            // }
          }
        );
      }
    });
  }

  calculateDistance(data: any, callback: any) {
    callback({ distance: 0 });
    // if (data.ride_type != 'rental') {
    //   callback({ distance: 0 });
    // } else if (
    //   data.source_latitude &&
    //   data.source_longitude &&
    //   data.destination_latitude &&
    //   data.destination_longitude
    // ) {
    //   this.distanceAPI =
    //     'http://192.168.1.228:5000/route/v1/driving/' +
    //     data.sourceLongitude +
    //     ',' +
    //     data.sourceLatitude +
    //     ';' +
    //     data.destinationLongitude +
    //     ',' +
    //     data.destinationLatitude +
    //     '?steps=true';
    //   this.getDistance('').subscribe((distanceResponse) => {
    //     let calculatedDistance = distanceResponse.routes[0].distance / 1000;
    //     callback({ distance: calculatedDistance });
    //   });
    // } else {
    //   callback({ distance: 0 });
    // }
  }
}
