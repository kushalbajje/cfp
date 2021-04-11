import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedriversComponent } from './managedrivers.component';

describe('ManagedriversComponent', () => {
  let component: ManagedriversComponent;
  let fixture: ComponentFixture<ManagedriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagedriversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
