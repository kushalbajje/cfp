import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';

@Injectable({ providedIn: 'root' })
export class HttpServices {
  constructor(private httpClient: HttpClient) {}
  public loginApi(loginData: any): Observable<any> {
    return this.httpClient.post(GlobalConstants.panelapiURL, loginData);
  }
  public getTripsApi(reqObject: any): Observable<any> {
    console.log(reqObject);
    return this.httpClient.post(GlobalConstants.tripListURL, reqObject);
  }
  public requestResetPassword(reqObject: any): Observable<any> {
    return this.httpClient.post(GlobalConstants.requestResetPasswordURL, reqObject);
  }
  public updateNewPassword(reqObject: any): Observable<any> {
    return this.httpClient.post(GlobalConstants.updateNewPasswordURL, reqObject);
  }

  public getCompanyList(reqObject: any): Observable<any> {
    return this.httpClient.post(GlobalConstants.getCompanyList, reqObject);
  }

  public addBooking(reqObject: any): Observable<any> {
    return this.httpClient.post(GlobalConstants.addBooking, reqObject);
  }

  public checkTripLocation(reqObject: any): Observable<any> {
    return this.httpClient.post(GlobalConstants.checkTripLocation, reqObject);
  }

  public bulkUploadBooking(reqObject: any): Observable<any> {
    return this.httpClient.post(GlobalConstants.bulkUploadBooking, reqObject);
  }

  public getRidesCount(reqObject: any): Observable<any> {
    return this.httpClient.post(GlobalConstants.getRidesCount, reqObject);
  }

  // public getAddress(): Observable<any>{
  //   return this.httpClient.get(GlobalConstants.getAddress);
  // }


}
