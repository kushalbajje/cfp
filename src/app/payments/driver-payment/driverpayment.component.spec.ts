import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverpaymentComponent } from './driverpayment.component';

describe('DriverpaymentComponent', () => {
  let component: DriverpaymentComponent;
  let fixture: ComponentFixture<DriverpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
