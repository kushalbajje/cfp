import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpServices } from '../services/apiservice';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  userName!: string;
  password1!: string;
  password2!: string;
  constructor(
    private router: Router,
    private httpService: HttpServices,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params: Params) => {
      this.userName = params['avatar'];
    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }
  sidebar() {
    console.log(this.userName);
    let resetObj = {
      username: this.userName,
      password: this.password1,
    };
    this.httpService.updateNewPassword(resetObj).subscribe((data) => {
      if (data.message == 'success') {
        this.router.navigate(['']);
      } else {
        console.log(data);
      }
    });
    // this.router.navigate(['/sidenav/bookings/unassigned']);
  }

  forgotpassword() {
    this.router.navigate(['/forgotpassword']);
  }
}
