import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkuploadbookingComponent } from './bulkuploadbooking.component';

describe('BulkuploadbookingComponent', () => {
  let component: BulkuploadbookingComponent;
  let fixture: ComponentFixture<BulkuploadbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkuploadbookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkuploadbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
