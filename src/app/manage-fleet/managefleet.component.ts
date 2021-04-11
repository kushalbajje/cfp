import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-managefleet',
  templateUrl: './managefleet.component.html',
  styleUrls: ['./managefleet.component.css'],
})
export class ManagefleetComponent implements OnInit {
  constructor(private router: Router, private route:ActivatedRoute) {}
  toggle: boolean = true;
  ngOnInit(): void {}

  
}
