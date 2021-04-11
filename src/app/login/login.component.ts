import { Component, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServices } from '../services/apiservice';
// import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  key = 'user_id';
  
  @Output() email!: string;
  password!: string;
  constructor(private router: Router, private httpService: HttpServices) {}

  ngOnInit(): void {
    localStorage.clear();
  }
  sidebar() {
    let loginObj = {
      username: this.email,
      password: this.password,
      user_latitude: 12.982542550760709,
      user_longitude: 77.5982212178553,
    };
    
    // this.httpService.loginApi(loginObj).subscribe((data) => {
    //   if (data.message == 'success') {
    //     console.log(data);
    //     let sessionObject = {
    //       user_id: data.response.user_id,
    //       branch_reference_number: data.response.branch_reference_number
    //     }
    //     localStorage.setItem('sessionObject',JSON.stringify(obj));
    //     this.router.navigate(['/sidenav/bookings/unassigned']);
    //   } else if(data.message === 'unsuccess'){
    //     this.router.navigate(['/resetpassword'],{ queryParams: { avatar: this.email } })
    //   }
    // });
    this.router.navigate(['/sidenav/bookings/unassigned'],{ skipLocationChange: true });
  }

  
}
