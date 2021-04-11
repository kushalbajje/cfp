import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesspaymentsComponent } from './businesspayments.component';

describe('BusinesspaymentsComponent', () => {
  let component: BusinesspaymentsComponent;
  let fixture: ComponentFixture<BusinesspaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesspaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesspaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
