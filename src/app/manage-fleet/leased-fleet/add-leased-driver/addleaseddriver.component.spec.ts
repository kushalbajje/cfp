import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddleaseddriverComponent } from './addleaseddriver.component';

describe('AddleaseddriverComponent', () => {
  let component: AddleaseddriverComponent;
  let fixture: ComponentFixture<AddleaseddriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddleaseddriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddleaseddriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
