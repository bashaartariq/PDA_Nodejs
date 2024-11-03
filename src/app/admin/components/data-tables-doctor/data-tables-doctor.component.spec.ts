import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablesDoctorComponent } from './data-tables-doctor.component';

describe('DataTablesDoctorComponent', () => {
  let component: DataTablesDoctorComponent;
  let fixture: ComponentFixture<DataTablesDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTablesDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTablesDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
