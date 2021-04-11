import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubvendorpaymentComponent } from './subvendorpayment.component';

describe('SubvendorpaymentComponent', () => {
  let component: SubvendorpaymentComponent;
  let fixture: ComponentFixture<SubvendorpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubvendorpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubvendorpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
