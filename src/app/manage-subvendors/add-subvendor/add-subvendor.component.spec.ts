import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubvendorComponent } from './add-subvendor.component';

describe('AddSubvendorComponent', () => {
  let component: AddSubvendorComponent;
  let fixture: ComponentFixture<AddSubvendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubvendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
