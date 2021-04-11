import { Component, ElementRef, OnInit } from '@angular/core';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { HttpServices } from '../services/apiservice';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-get-location',
  templateUrl: './get-location.component.html',
  styleUrls: ['./get-location.component.css'],
})
export class GetLocationComponent implements OnInit {
  constructor(
    private httpService: HttpServices,
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<GetLocationComponent>
  ) {}

  address!: string;
  latitude!: number;
  longitude!: number;

  api!: string;
  addr: any;
  contextArray: String[] = [];
  addressObject = {
    region: '',
    country: '',
    district: '',
    place: '',
    locality: '',
    address: '',
    latitude: 0,
    longitude: 0,
  };

  @ViewChild('geocoder') d1!: ElementRef;

  ngOnInit() {
    setTimeout(() => {
      var map = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.5946, 12.9716],
        zoom: 16,
      });

      // addControl(
      //   new MapboxGeocoder({ accessToken: environment.mapbox.accessToken }).on(
      //     'result',
      //     function (e) {
      //       map.getCenter();
      //       console.log(JSON.stringify(e.result, null, 2));
      //     }
      //   )
      // );

      var geocoder = new MapboxGeocoder({
        accessToken: environment.mapbox.accessToken,
      });

      geocoder.addTo(map);
      var marker = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat([77.5946, 12.9716])
        .addTo(map);

      map.on('move', (e) => {
        marker.setLngLat(map.getCenter());
        const addr = marker.getLngLat();

        this.latitude = addr.lat;
        this.longitude = addr.lng;
      });

      // this.d1.nativeElement.insertAdjacentHTML(
      //   geocoder.addTo(map)
      // );
    }, 1);
  }

  onGetAddress() {
    this.api =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      this.longitude +
      ',' +
      this.latitude +
      '.json?limit=1&access_token=pk.eyJ1Ijoia3VzaGFsYmFqamUiLCJhIjoiY2tpbDVwdGpwMGdjbTM2bzhjZWsxaHRoeSJ9.hcfYHTTreNb0c8cJTzYXww';
    this.getAddress().subscribe((data) => {
      this.contextArray = data.features[0].context;

      this.addressObject.address = data.features[0].place_name;
      this.addressObject.latitude = this.latitude;
      this.addressObject.longitude = this.longitude;

      this.contextArray.forEach((eachReccord: any) => {
        switch (true) {
          case eachReccord.id.includes('country'):
            this.addressObject.country = eachReccord.text;
            break;
          case eachReccord.id.includes('region'):
            this.addressObject.region = eachReccord.text;
            break;
          case eachReccord.id.includes('place'):
            this.addressObject.place = eachReccord.text;
            break;
          case eachReccord.id.includes('district'):
            this.addressObject.district = eachReccord.text;
            break;
          default:
            break;
        }
      });

      this.dialogRef.close(this.addressObject);
    });
  }

  closeDialog() {
    this.addressObject.address = '';

    this.dialogRef.close(this.addressObject);
  }

  public getAddress(): Observable<any> {
    return this.httpClient.get(this.api);
  }
}
