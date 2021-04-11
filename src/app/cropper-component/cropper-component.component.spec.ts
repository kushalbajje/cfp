import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperComponentComponent } from './cropper-component.component';

describe('CropperComponentComponent', () => {
  let component: CropperComponentComponent;
  let fixture: ComponentFixture<CropperComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropperComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
