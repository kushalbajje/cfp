import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagevehiclesComponent } from './managevehicles.component';

describe('ManagevehiclesComponent', () => {
  let component: ManagevehiclesComponent;
  let fixture: ComponentFixture<ManagevehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagevehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagevehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
