import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDataTablesComponent } from './appointment-data-tables.component';

describe('AppointmentDataTablesComponent', () => {
  let component: AppointmentDataTablesComponent;
  let fixture: ComponentFixture<AppointmentDataTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDataTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDataTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
