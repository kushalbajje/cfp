import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasedfleetComponent } from './leasedfleet.component';

describe('LeasedfleetComponent', () => {
  let component: LeasedfleetComponent;
  let fixture: ComponentFixture<LeasedfleetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeasedfleetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasedfleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
