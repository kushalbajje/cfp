import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedfleetComponent } from './ownedfleet.component';

describe('OwnedfleetComponent', () => {
  let component: OwnedfleetComponent;
  let fixture: ComponentFixture<OwnedfleetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnedfleetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedfleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
