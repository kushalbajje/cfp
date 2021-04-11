import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesubvendorsComponent } from './managesubvendors.component';

describe('ManagesubvendorsComponent', () => {
  let component: ManagesubvendorsComponent;
  let fixture: ComponentFixture<ManagesubvendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagesubvendorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesubvendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
