import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../services/apiservice';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email!: string;
  constructor(private httpService: HttpServices) { }

  ngOnInit(): void {
  }

  requestResetPassword(){
    let reqObj = {
      username: this.email,
    };
    console.log('*****************');
    this.httpService.requestResetPassword(reqObj).subscribe((data)=>{
      if(data.message === 'success') {
        console.log('success');
      } else{
        console.log('failure');
      }
    })
  }

}

