import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ownedfleet',
  templateUrl: './ownedfleet.component.html',
  styleUrls: ['./ownedfleet.component.css'],
})
export class OwnedfleetComponent implements OnInit {
  constructor(private router: Router, private route:ActivatedRoute) {}
  toggle: boolean = true;
  ngOnInit(): void {}
  
}
