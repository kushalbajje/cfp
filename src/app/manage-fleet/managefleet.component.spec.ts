import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagefleetComponent } from './managefleet.component';

describe('ManagefleetComponent', () => {
  let component: ManagefleetComponent;
  let fixture: ComponentFixture<ManagefleetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagefleetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagefleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
