import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(public id: String,
  public pickup:String,
  public dropoff:String) { }
}
