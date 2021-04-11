import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebusinessComponent } from './managebusiness.component';

describe('ManagebusinessComponent', () => {
  let component: ManagebusinessComponent;
  let fixture: ComponentFixture<ManagebusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagebusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagebusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
